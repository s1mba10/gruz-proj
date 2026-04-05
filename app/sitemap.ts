import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://gruzim-krasnodar.ru", changeFrequency: "weekly", priority: 1 },
    { url: "https://gruzim-krasnodar.ru/gruzchiki", changeFrequency: "weekly", priority: 0.9 },
    { url: "https://gruzim-krasnodar.ru/vyvoz-musora", changeFrequency: "weekly", priority: 0.9 },
    { url: "https://gruzim-krasnodar.ru/pereezd", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://gruzim-krasnodar.ru/mezhgorod", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://gruzim-krasnodar.ru/perevozka-mebeli", changeFrequency: "weekly", priority: 0.7 },
    { url: "https://gruzim-krasnodar.ru/ceny", changeFrequency: "weekly", priority: 0.7 },
  ];
}
