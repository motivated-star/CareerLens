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