# Component Map

Source reference: `design/overview/Food Delivery App UI Kit Food App Design Food Mobile App Delivery UI (Community) (Copy).pdf`

This map is based on repeated labels and recurring screen structures visible in the PDF. It is intended for implementation planning, not visual token extraction.

## Core Reusable Components

| Component | Seen In PDF Flows | Why It Repeats | Build Priority |
| --- | --- | --- | --- |
| Primary button | Auth, onboarding, cart, checkout, order states, support | The main progression action is present in nearly every flow | High |
| Secondary button / text action | Auth, review, logout, cancel flows | Reused for alternate actions such as `Cancel`, `Edit`, and `Leave a review` | High |
| Search input | Home, search results, help center, cart variants | The same top search affordance appears across discovery and help flows | High |
| Screen header | Home, profile, orders, support, settings | Most inner screens use a title-first shell with optional actions | High |
| Section header with trailing action | Home sections like `View All`, account sections, order groups | Reused to separate list sections without changing structure | High |
| Category chips / tabs | Home, search, filter, order status segments | The app repeatedly uses chips and segmented tabs for mode switching | High |
| Product card | Home, search, favorites, best seller, recommendations | The main browse unit repeats across food categories | High |
| Promo banner card | Home, notifications entry states | Repeated campaign/offer surface in discovery | Medium |
| Rating badge | Product cards and detail screens | Ratings repeat across browse and detail surfaces | High |
| Quantity stepper | Product detail, cart, order summary | The same increment/decrement control is needed before and after add-to-cart | High |
| Product option group | Product detail screens | Toppings, add-ons, tea base, and size all use the same selectable-option pattern | High |
| Price summary rows | Cart, confirm order, payment, order details | Subtotal, tax, delivery, and total repeat without layout changes | High |
| Address card / address row | Checkout, delivery address list | Address presentation is reused in account and transactional flows | Medium |
| Payment method card / row | Payment screen, saved payment methods, add card | One pattern can cover selection and management states | Medium |
| Order card | Active, completed, cancelled, history | Orders are consistently presented as summary rows/cards with status and actions | High |
| Status timeline | Delivery time, live tracking, delivered state | Delivery progress uses repeated milestone steps | Medium |
| Review form | `Leave a Review` | Single-screen form pattern, but it depends on shared input and button primitives | Medium |
| Empty state block | Empty cart, no active orders | Simple reusable state shell with message and optional CTA | Medium |
| Setting row | Account hub, settings, contact/help menus | One chevron-row component can support many account screens | Medium |
| Toggle row | Notification setting | Multiple toggles share the same settings-row pattern with a trailing switch | Medium |
| Contact channel row | Contact Us, Help Center | Same list-row pattern with different icon and destination | Low |
| Notification item | Notifications list | Reuses compact card/list-row structure | Low |
| Support message panel / quick-option list | Support flow | A focused support component set for the chat-like help flow | Low |

## Reusable Layout Shells

- `FullScreenIntroShell`: splash, onboarding, confirmation, cancelled, delivered.
- `FormScreenShell`: login, sign-up, set password, add address, add card, profile update, password setting.
- `FeedScreenShell`: home, search, favorites, notifications.
- `SegmentedListShell`: my orders, help center tabs.
- `DetailWithStickyActionShell`: all product detail screens.
- `SummaryWithFooterShell`: cart, confirm order, payment, order details.
- `SettingsListShell`: account hub, notification settings, contact methods.

## Build Order For Components

1. Buttons, inputs, headers, chips, tabs, and price-summary rows.
2. Product cards, rating badge, and the base feed/list shell.
3. Product detail option groups and quantity stepper.
4. Cart line item row, address row, payment row, and order card.
5. Status timeline and review form.
6. Settings rows, toggle rows, notification items, and support-specific pieces.

## Components That Should Stay Generic

- Product detail should not be split into separate food-specific components. The PDF shows one detail pattern with different option data.
- Order cards should handle active, completed, cancelled, and history states through props, not separate components.
- Address and payment rows should be shared by both account management and checkout.
- Help center lists and contact rows should reuse the same list-item foundation as profile/settings.

## What Not To Infer From The PDF

- Exact spacing scale, typography values, icon sizes, or color tokens.
- Precise image crops or banner aspect ratios.
- Final interaction details for tabs, filters, and support chat transitions.

Use the PDF to decide component families and build order, then refine visuals later from exported assets or direct design inspection.
