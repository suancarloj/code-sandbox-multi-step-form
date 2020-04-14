import Loadable from "@loadable/component";

export const CityPageLoadable = Loadable(() => import("./CityPage"));

export const StreetPageLoadable = Loadable(() => import("./StreetPage"));

export const ZipPageLoadable = Loadable(() => import("./ZipPage"));

export const NumberPageLoadable = Loadable(() => import("./NumberPage"));

export const SummaryPageLoadable = Loadable(() => import("./SummaryPage"));
