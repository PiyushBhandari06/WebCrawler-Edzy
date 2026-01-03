import Page from "../models/Page.model.js";

export const savePage = async ({ url, html, outgoingLinks }) => {
  return Page.findOneAndUpdate(
    { url },
    {
      url,
      html,
      outgoingLinks,
      crawledAt: new Date(),
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
};
