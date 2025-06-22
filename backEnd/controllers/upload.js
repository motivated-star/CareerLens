const FormData = require('form-data');
const axios = require('axios');

// Parser function to convert FastAPI response string into JSON
function parseFastApiResponse(responseString) {
  const result = {
    match_score: null,
    missing_skills: [],
    suggestions: [],
    summary: '',
  };

  // Extract match score (e.g., **Match Score: 85/100**)
  const scoreMatch = responseString.match(/\*\*Match Score:\s*(\d+)(?:\/\d+)?\*\*/);
if (scoreMatch) {
  result.match_score = parseInt(scoreMatch[1], 10); 
}

  // Extract missing skills list
  const missingSkillsMatch = responseString.match(/\*\*Missing Skills:\*\*([\s\S]*?)\n\n\*\*Suggestions to Improve the Resume:\*\*/);
  if (missingSkillsMatch) {
    // Split lines starting with numbers
    const skillsText = missingSkillsMatch[1];
    const skillLines = skillsText.split('\n').filter(line => line.trim().match(/^\d+\.\s*\*\*(.+?)\*\*/));
    result.missing_skills = skillLines.map(line => {
      const skillMatch = line.match(/^\d+\.\s*\*\*(.+?)\*\*/);
      return skillMatch ? skillMatch[1] : null;
    }).filter(Boolean);
  }

  // Extract suggestions list
  const suggestionsMatch = responseString.match(/\*\*Suggestions to Improve the Resume:\*\*([\s\S]*)$/);
  if (suggestionsMatch) {
    const suggestionsText = suggestionsMatch[1];
    // Split by lines starting with numbers
    const suggestionLines = suggestionsText.split('\n').filter(line => line.trim().match(/^\d+\.\s*\*\*(.+?)\*\*/));
    result.suggestions = suggestionLines.map(line => {
      const suggestionMatch = line.match(/^\d+\.\s*\*\*(.+?)\*\*(.*)/);
      if (suggestionMatch) {
        return suggestionMatch[1] + suggestionMatch[2].trim();
      }
      return null;
    }).filter(Boolean);
  }

  // Optional: extract summary paragraph (between Match Score and Missing Skills)
  const summaryMatch = responseString.match(/\*\*Match Score:.*?\*\*\n\n([\s\S]*?)\n\n\*\*Missing Skills:/);
  if (summaryMatch) {
    result.summary = summaryMatch[1].trim();
  }

  return result;
}


const upload = async (req, res) => {
  try {
    const formData = new FormData();

    if (req.body.jobDescription) {
      formData.append('job_description', req.body.jobDescription);
    } else if (req.body.jobLink) {
      formData.append('job_link', req.body.jobLink);
    } else {
      return res.status(400).json({ error: "Provide either jobLink or jobDescription" });
    }

    formData.append('resume', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const response = await axios.post(
      `${process.env.FASTAPI_URL}/analyze`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Content-Length': formData.getLengthSync()
        }
      }
    );

    console.log('Raw Response from FastAPI:', response.data);

    // Parse the string response into JSON
    const parsedResult = parseFastApiResponse(response.data.result || response.data);

    // Send parsed JSON to client
    res.json(parsedResult);

  } catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    res.status(500).json({
      error: "Analysis failed",
      details: error.response?.data || error.message
    });
  }
};

module.exports = { upload };
