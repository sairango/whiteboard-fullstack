export const getbasic = (req, res) => {
  console.log("req received");
  res.send("This is get req;");
  
};



export const delbasic = (req, res) => {
  res.send("this is a delreq");
};

