export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    semibold: "System",
    bold: "System",
  },
  heading: {
    xl: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: "700" as const,
    },
    lg: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "700" as const,
    },
    md: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "600" as const,
    },
  },
  body: {
    lg: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "400" as const,
    },
    md: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "400" as const,
    },
    sm: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "400" as const,
    },
  },
  label: {
    lg: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: "600" as const,
    },
    md: {
      fontSize: 14,
      lineHeight: 18,
      fontWeight: "600" as const,
    },
    sm: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500" as const,
    },
  },
} as const;
