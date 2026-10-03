import EntityManager from "../EntityManager";

import type { EntityConfig } from "../types";

const config: EntityConfig = {
  table: "activities",

  title: "Activities",

  titleField: "title",

  fields: [
    { name: "title", label: "Title", required: true },

    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        "Work",
        "Project",
        "Organization",
        "Competition",
        "Campus",
        "Other",
      ],
    },

    { name: "date", label: "Periode", type: "date-range", required: true },

    { name: "location", label: "Location" },

    { name: "description", label: "Description", type: "textarea" },

    { name: "image", label: "Cover image", type: "image" },

    { name: "gallery", label: "Gallery images", type: "images" },

    { name: "what_i_did", label: "What I did", type: "textarea" },

    { name: "what_i_learned", label: "What I learned", type: "textarea" },

    { name: "skills_used", label: "Skills used", type: "list" },
  ],
};

export default function ActivitiesAdmin() {
  return <EntityManager config={config} />;
}
