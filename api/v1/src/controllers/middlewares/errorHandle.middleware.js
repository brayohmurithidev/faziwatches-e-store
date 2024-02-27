import mongoose from "mongoose"
export const errorHandlerMiddleware = (err, req, res, next)=> {
    if(err instanceof mongoose.Error){
      return  res.status(err.status || 500).json({error: err.message})
    }
    return res.status(err.status || 500).json({error: err.message})
} 