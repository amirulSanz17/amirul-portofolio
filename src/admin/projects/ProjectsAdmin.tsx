import EntityManager from "../EntityManager"

import type { EntityConfig } from "../types"

const config: EntityConfig = {
  table: "projects",

  title: "Projects",

  titleField: "name",

  fields: [
    { name: "name", label: "Name", required: true },

    { name: "description", label: "Description", type: "textarea" },

    { name: "role", label: "Role" },

    { name: "category", label: "Category" },

    { name: "date", label: "Periode", type: "date-range", required: true },

    { name: "tech", label: "Technologies", type: "list" },

    { name: "image", label: "Cover image", type: "image" },

    { name: "github", label: "GitHub URL", type: "url" },

    { name: "demo", label: "Demo URL", type: "url" },

    { name: "problem", label: "Problem", type: "textarea" },

    { name: "solution", label: "Solution", type: "textarea" },

    { name: "features", label: "Features", type: "list" },

    { name: "screenshots", label: "Screenshots", type: "images" },
  ],
}

export default function ProjectsAdmin() {
  return <EntityManager config={config} />
}
