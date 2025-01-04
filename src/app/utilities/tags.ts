const tagKeys = [
  "PROFILE",
  "DASHBOARD",
  "B2B",
  "B2C",
  "CONFIGURATION",
  "ADMINISTRATION",
  "PAYMENT",
  "SUPPORT",
  "HOTEL-COMMISSION",
  "AIRLINECOMMISSION",
  "AIRLINE",
  "AIRPORT",
  "VISA-TYPE",
] as const;

export const TagTypes = Object.fromEntries(
  tagKeys.map((key) => [key, key])
) as { [K in (typeof tagKeys)[number]]: K };

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];

export type Tag = {
  type: TagType;
  id: `${TagType}_ID`;
};

export function CREATE_TAGS(type: TagType): Tag {
  return {
    type,
    id: `${type}_ID`,
  };
}
