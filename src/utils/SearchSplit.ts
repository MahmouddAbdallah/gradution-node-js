import SearchModel from "../models/SearchModel";

export const createSearchData = async (data: string, type: string) => {
    const newData = data.split(" ");
    const promises = newData.map(async (keyword) => {
        if (keyword.length >= 4) {
            try {
                await SearchModel.create({
                    keyword,
                    type: type
                });
            } catch (error) {
                console.error(`Error creating search data for keyword "${keyword}":`, error);
            }
        }
    });

    await Promise.all(promises);
    return true
};
