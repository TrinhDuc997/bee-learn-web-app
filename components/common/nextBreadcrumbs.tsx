import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { breadCrumbNames } from "./breadCrumbNames";

export interface INextBreadcrumbsProps {}

export function NextBreadcrumbs(props: INextBreadcrumbsProps) {
  const router = useRouter();
  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split("?")[0];
    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      // The title will just be the route string for now
      const title = subpath;
      const breadcrumbs = subpath.split("-");
      const breadcrumb = breadcrumbs.map((i) => i.toUpperCase()).join("_");
      return {
        href,
        text: breadCrumbNames[`breadCrumb_${breadcrumb}`] || title,
      };
    });
    // Add in a default "Home" crumb for the top-level
    return [{ href: "/", text: "Home" }, ...crumblist];
  }
  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs();

  // if only at Home then no display Breadcrumb
  if (breadcrumbs.length === 1 && breadcrumbs[0].text === "Home") {
    return null;
  }

  return (
    <Stack mt={"1rem"} mb={"1rem"}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {/*
        Iterate through the crumbs, and render each individually.
        We "mark" the last crumb to not have a link.
      */}
        {breadcrumbs.map((crumb, idx) => (
          <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
        ))}
      </Breadcrumbs>
    </Stack>
  );
}

// Each individual "crumb" in the breadcrumbs list
function Crumb({
  text,
  href,
  last = false,
}: {
  text: string;
  href: string;
  last: boolean;
}) {
  // The last crumb is rendered as normal text since we are already on the page
  if (last) {
    return <Typography color="inherit">{text}</Typography>;
  }

  // All other crumbs will be rendered as links that can be visited

  return (
    <Link color="text.primary" underline="hover" href={href}>
      {text}
    </Link>
  );
}
