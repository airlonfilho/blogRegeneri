const router = require('express').Router();

//get Health
router.get('/health', async (req,res) => {
  try {
  res.status(200).json("Api Funcionando");

  } catch (error) {
   res.status(500).json(error); 
  }
})

module.exports = router;