import { rest } from "msw";
import { setMenusData, set_menu_infos } from "./set-menus-data";

//https://imyogurt.vercel.app/set-menus?_data=routes%2Fset-menus%2Findex
export const handlers = [
  // rest.get("/set-menus", (req, res, ctx) => {
  //   return res(
  //     // Respond with a 200 status code
  //     ctx.json(setMenusData),
  //     ctx.status(200)
  //   );
  // }),
  // rest.post(
  //   "https://dqtpvxtxluhylhpmclue.supabase.co/rest/v1/rpc/set_menu_infos",
  //   (req, res, ctx) => {
  //     return res(ctx.json(set_menu_infos), ctx.status(200));
  //   }
  // ),
];
