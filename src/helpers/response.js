 const successResponse = async (res, data, msg) => {
  await res.status(200).json({ status: 1, data, msg });
};


 const unauthorized = async (res, msg) => {
    await res.status(401).json({ status: 0, msg });
}

 const other = async (res, msg) => {
  await res.status(400).json({status: 0, msg });
}

const serverError = async (res, err) => {
  console.log(err);
  await res.status(500).json({status: 0, msg: 'Server Error' });
}


module.exports = {other, successResponse, unauthorized, serverError}