import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  });

export const JournalModel = mongoose.model("Journal", JournalSchema);

export const createJournal = (values: Record<string, any>) => new JournalModel(values).save().then((journal) => journal.toObject());
export const getJournals = () => JournalModel.find();
export const getLastDayJournals = () => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

  return JournalModel.find({ createdAt: { $gte: twentyFourHoursAgo } });
}
