import mongoose,{Document,Schema} from "mongoose";

export interface IUrl extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  clicks:number,
  createdAt: Date;
}

const UrlSchema:Schema = new Schema(
  {
    urlCode: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks:{type:Number, required:true,default:0},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUrl>("Url", UrlSchema);
