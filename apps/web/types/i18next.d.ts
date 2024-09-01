import "i18next";

import common from "@/locales/en/common.json";
import api from "@/locales/en/order.json";

interface I18nNamespaces {
  api: typeof order;
  common: typeof common;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}
