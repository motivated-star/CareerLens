const FormData = require('form-data');
const axios = require('axios');

const upload = async (req, res) => {
  try {
    const formData = new FormData();
    // Use 'job_link' instead of 'jobLink' to match FastAPI
    formData.append('job_link', req.body.jobLink);  
    formData.append('resume', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    console.log('Form data prepared:', formData);
  //    res.json({
  //     coverage_percentage: 85,
  //     matching_skills: ["React", "JavaScript", "CSS"],
  //     missing_skills: ["TypeScript", "Node.js"],
  //   });
  // } catch (err) {
  //   console.error("Error during upload:", err);
  //   res.status(500).json({ error: "Server error during file upload" });
  // }
    const response = await axios.post(
      'http://localhost:8000/analyze',
      formData,
      { 
        headers: {
          ...formData.getHeaders(),
          'Content-Length': formData.getLengthSync()  // Important!
        }
      }
    );

    res.json(response.data);
    console.log('Response from FastAPI:', response.data);
  } catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    res.status(500).json({
      error: "Analysis failed",
      details: error.response?.data || error.message
    });
  }
};

module.exports = { upload };