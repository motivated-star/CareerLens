import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Mail } from "lucide-react";
import axios from "axios";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: "applied" | "interview" | "offer" | "rejected";
  appliedDate: string;
  source: "manual" | "portal";
  followUpEmail?: string;
  followUpMessage?: string;
  followUpDate?: string;
  notes?: string;
}

export default function JobDashboard() {
  // const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      status: "interview",
      appliedDate: "2024-01-15",
      source: "portal",
      followUpEmail: "hr@techcorp.com",
      followUpMessage: "Looking forward to the next steps",
      notes: "Great company culture",
    },
    {
      id: "2",
      title: "React Developer",
      company: "StartupXYZ",
      location: "Remote",
      status: "applied",
      appliedDate: "2024-01-10",
      source: "manual",
      followUpEmail: "jobs@startupxyz.com",
      followUpDate: "2024-01-20",
      followUpMessage: "Looking forward to the next steps",
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "New York, NY",
      status: "offer",
      appliedDate: "2024-01-05",
      source: "portal",
      followUpEmail: "recruiter@innovationlabs.com",
    },
  ]);

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const statusColors = {
  //   applied: "bg-blue-100 text-blue-800",
  //   interview: "bg-yellow-100 text-yellow-800",
  //   offer: "bg-green-100 text-green-800",
  //   rejected: "bg-red-100 text-red-800",
  // };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (formData: FormData) => {
    console.log("Form submitted with data:");
    const jobData = {
      id: editingJob?.id || Date.now().toString(),
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as Job["status"],
      appliedDate: formData.get("appliedDate") as string,
      source: formData.get("source") as Job["source"],
      followUpEmail: formData.get("followUpEmail") as string,
      followUpMessage: formData.get("followUpMessage") as string,
      followUpDate: formData.get("followUpDate") as string,
      notes: formData.get("notes") as string,
    };

    if (editingJob) {
      setJobs(jobs.map((job) => (job.id === editingJob.id ? jobData : job)));
    } else {
      setJobs([...jobs, jobData]);
    }

    setEditingJob(null);
    setIsDialogOpen(false);


    if (
      jobData.followUpEmail &&
      jobData.followUpMessage &&
      jobData.followUpDate
    ) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/schedule-followup`, {
          to: jobData.followUpEmail,
          message: jobData.followUpMessage,
          scheduledAt: jobData.followUpDate,
        });
      } catch (err) {
        console.error("Failed to schedule follow-up:", err);
      }
    } else {
      console.warn("Follow-up details incomplete. Not scheduling follow-up email.");
    }
  };


  const deleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const updateStatus = (id: string, status: Job["status"]) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status } : job)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header
        className={`sticky top-0 z-50 p-4 bg-white/90 backdrop-blur-md border-b border-blue-200 transition-transform duration-700 ease-out ${isLoaded ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-800">Job Dashboard</h1>
          {/* <nav className="hidden md:flex gap-8">
            <Button
              variant="ghost"
              className="text-blue-800 hover:text-blue-600"
              onClick={() => navigate('/home')}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-blue-800 hover:text-blue-600"
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="text-blue-800 hover:text-blue-600"
            >
              Contact
            </Button>
          </nav> */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              My Applications
            </h2>
            <p className="text-slate-600">{jobs.length} total applications</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setEditingJob(null)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingJob ? "Edit Job" : "Add New Job"}
                  </DialogTitle>
                </DialogHeader>
                <div className="max-h-[80vh] overflow-y-auto p-4">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmit(formData);
                  }}
                    className="space-y-4">
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={editingJob?.title}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        defaultValue={editingJob?.company}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={editingJob?.location}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="followUpEmail">Follow-up Email</Label>
                      <Input
                        id="followUpEmail"
                        name="followUpEmail"
                        type="email"
                        defaultValue={editingJob?.followUpEmail}
                        placeholder="hr@company.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="followUpMessage">Message</Label>
                      <Textarea
                        id="followUpMessage"
                        name="followUpMessage"
                        defaultValue={editingJob?.followUpMessage || ""}
                        placeholder="Hi, just following up on my application..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="followUpDate">Schedule Date & Time</Label>
                      <Input
                        id="followUpDate"
                        name="followUpDate"
                        type="datetime-local"
                        defaultValue={editingJob?.followUpDate}
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        name="status"
                        defaultValue={editingJob?.status || "applied"}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="appliedDate">Applied Date</Label>
                      <Input
                        id="appliedDate"
                        name="appliedDate"
                        type="date"
                        defaultValue={editingJob?.appliedDate}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="source">Source</Label>
                      <Select
                        name="source"
                        defaultValue={editingJob?.source || "manual"}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual Entry</SelectItem>
                          <SelectItem value="portal">Job Portal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        defaultValue={editingJob?.notes}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {editingJob ? "Update Job" : "Add Job"}
                    </Button>
                  </form>
                </div>

              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-blue-100 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">
                  Job Title
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Company
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Location
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Applied Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Follow-up Email
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Follow-up Message
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Follow-up Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Source
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium text-slate-800">
                    {job.title}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {job.company}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {job.location}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={job.status}
                      onValueChange={(value) =>
                        updateStatus(job.id, value as Job["status"])
                      }
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="rejected">Ghosted</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {job.appliedDate}
                  </TableCell>
                  <TableCell>
                    {job.followUpEmail ? (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a
                          href={`mailto:${job.followUpEmail}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {job.followUpEmail}
                        </a>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">No email</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {job.followUpMessage ? (
                      <div className="flex items-center gap-2">
                        {job.followUpMessage}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">No Message</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {job.followUpDate}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {job.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingJob(job);
                          setIsDialogOpen(true);
                        }}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteJob(job.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">
                {searchTerm
                  ? "No jobs found matching your search"
                  : "No job applications yet"}
              </p>
              {!searchTerm && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Job
                </Button>
              )}
            </div>
          )}
        </div>

        {filteredJobs.length > 0 && (
          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredJobs.length} of {jobs.length} applications
          </div>
        )}
      </main>
    </div>
  );
}
