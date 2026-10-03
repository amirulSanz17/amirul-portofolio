import EntityManager from "../EntityManager";

import type { EntityConfig } from "../types";

const config: EntityConfig = {
  table: "achievements",

  title: "Achievements",

  titleField: "title",

  fields: [
    { name: "title", label: "Title", required: true },
    { name: "event", label: "Event" },
    { name: "organizer", label: "Organizer" },
    { name: "date", label: "Periode", type: "date-range", required: true },
    { name: "position", label: "Position" },

    {
      name: "position_color",
      label: "Badge color",
      type: "select",
      options: ["gold", "silver", "bronze", "blue"],
    },

    { name: "description", label: "Description", type: "textarea" },

    { name: "role", label: "Role" },

    { name: "image", label: "Cover image", type: "image" },

    { name: "gallery", label: "Gallery images", type: "images" },
  ],
};

export default function AchievementsAdmin() {
  return <EntityManager config={config} />;
}
