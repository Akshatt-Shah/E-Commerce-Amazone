import { number } from "yup";

export function DynamicQuery(SearchTerm: any) {
  let MatchObjects: any = {};
  let sort: any = { createdAt: -1 };
  if (SearchTerm.search) {
    const regex = new RegExp(SearchTerm.search, "i");
    const searchProducts = ["name", "description"];
    MatchObjects = {
      $or: [
        { name: regex },
        { description: regex },
        { "CatagoryInfo.name": regex },
      ],
    };
  }

  if (SearchTerm.sort) {
    const flag = SearchTerm.sort[0] == "-" ? -1 : 1;

    SearchTerm.sort = SearchTerm.sort.replace("-", "");
    sort[SearchTerm.sort] = flag;
  }

  if (Number(SearchTerm.min)) {
    MatchObjects["price"] = { $gte: Number(SearchTerm.min) };
  }

  if (Number(SearchTerm.max)) {
    MatchObjects["price"] = {
      ...MatchObjects["price"],
      $lte: Number(SearchTerm.max),
    };
  }
  if (SearchTerm.category) {
    MatchObjects["CatagoryInfo.name"] = String(SearchTerm.category);
  }
  if (SearchTerm.store) {
    MatchObjects["StoreInfo.store_name"] = String(SearchTerm.store);
  }
  if (SearchTerm.product) {
    MatchObjects["name"] = { $regex: SearchTerm.product, $options: "i" };
  }

  console.log(MatchObjects);
  return { MatchObjects, sort };
}
