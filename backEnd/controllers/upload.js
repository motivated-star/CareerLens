const axios = require("axios");

const upload = async (req, res) => {
  try {
    const resumeFile = req.file;
    const jobLink = req.body.jobLink;

    if (!resumeFile || !jobLink) {
      return res.status(400).json({ message: "Resume and job link are required." });
    }

    // Prepare FormData for Python API
    const FormData = require("form-data");
    const formData = new FormData();

    formData.append("resume", resumeFile.buffer, {
      filename: resumeFile.originalname,
      contentType: resumeFile.mimetype,
    });
    formData.append("jobLink", jobLink);

    // Forward to FastAPI service
    // const pythonResponse = await axios.post("http://localhost:8000/process", formData, {
    //   headers: formData.getHeaders(),
    // });

    // Return Python response to frontend
    return res.status(200).json({
      message: "Processed successfully",
    //   result: pythonResponse.data,
    });

  } catch (error) {
    console.error("Error forwarding to Python service:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { upload };
