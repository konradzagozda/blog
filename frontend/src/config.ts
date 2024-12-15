interface Config {
  contentful: {
    spaceId: string;
    accessToken: string;
  };
}

const configs: Record<string, Config> = {
  production: {
    contentful: {
      spaceId: "5qd8uxunnv69",
      accessToken: "gkmni5rbKRJ2hnLNnxDlBMwgX9S2fsQP9WlmhIgyblI"
    }
  },
  staging: {
    contentful: {
      spaceId: "w8m1kftdc0fd",
      accessToken: "lWT81BH9yza_BHbB2OBIHr9uAqVGDDFj4GDyTBg_9j4"
    }
  }
};

export const config = configs[import.meta.env.MODE] || configs.staging; 