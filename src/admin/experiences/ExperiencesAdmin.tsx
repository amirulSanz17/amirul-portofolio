import EntityManager from "../EntityManager";

import type { EntityConfig } from "../types";

const config: EntityConfig = {
  table: "experiences",

  title: "Experience",

  titleField: "company",

  fields: [
    { name: "company", label: "Company", required: true },

    { name: "position", label: "Position", required: true },

    { name: "location", label: "Location" },

    { name: "date", label: "Periode", type: "date-range", required: true },

    { name: "image", label: "Cover image", type: "image" },

    { name: "description", label: "Description", type: "textarea" },

    { name: "responsibilities", label: "Responsibilities", type: "list" },

    { name: "skills", label: "Skills", type: "list" },

    { name: "gallery", label: "Gallery images", type: "images" },
  ],
};

export default function ExperiencesAdmin() {
  return <EntityManager config={config} />;
}
