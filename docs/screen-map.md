# Screen Map

Source reference: `design/overview/Food Delivery App UI Kit Food App Design Food Mobile App Delivery UI (Community) (Copy).pdf`

Use this PDF as a flow and screen-relationship reference only. Do not treat it as a pixel-perfect implementation spec.

## Flow Groups

| Flow | Screens Observed In PDF | Repeated Pattern | Variant Notes | Suggested Build Phase |
| --- | --- | --- | --- | --- |
| Launch | `CRAVYO`, brand splash, entry CTA with `Log In` and `Sign Up` | Full-screen hero with centered brand copy and bottom actions | This is a one-off entry shell, not a reusable app pattern | Later |
| Onboarding | `Order for Food`, `Easy Payment`, `Fast Delivery` | Full-screen walkthrough with image, title, supporting copy, and single CTA | The three slides are content variants of one onboarding template | Later |
| Auth | `Welcome`, `Log In`, `New Account`, `Set Password`, `forget password`, `or sign up with` | Form screen with title, helper text, stacked inputs, social row, and footer link | Login, sign-up, and password-reset are all variants of one auth form shell | Medium |
| Home / Discovery | `Good Morning`, `Search`, category chips, promo banner `30% OFF`, `Best Seller`, `Recommend`, `Recommendations`, notification entry | Scroll feed with sticky top search, horizontal categories, and stacked card sections | Home sections differ by data source, not by layout system | High |
| Search / Filter | Repeated `Search` list screens, `Filter`, `Sort by`, `Popular`, `Top Rated`, category-specific result sets | Search header plus filter controls and product-card list | Snack, meal, vegan, dessert, and drinks results are the same screen pattern with different content | High |
| Product Detail / Menu | `Mexican Appetizer`, `Fresh Prawn Ceviche`, `Bean and Vegetable Burger`, `Strawberry Cheesecake`, `Fruit and Berry Tea`, `Pizza with Pepperoni and Cheese` | Product detail with rating, price, description, option groups, quantity stepper, and `Add to Cart` CTA | The option block changes by item type: toppings, add-on ingredients, tea base, or size selection | High |
| Favorites | `Favorites`, saved dish list, short descriptions | Simple saved-items list built from the same product-card family as discovery/search | This is a list-state variant of the product feed | Low |
| Notifications | `Notifications`, promotion alert, delivery alert | Lightweight list of activity rows | Can reuse order/favorite list-row structure with a smaller visual treatment | Low |
| Cart | `Your cart is empty`, filled `Cart`, subtotal, fees, delivery, total, `Checkout` | Commerce summary screen with editable line items and fixed summary/footer action | Empty cart and filled cart are state variants of one cart route | High |
| Checkout | `Confirm Order`, `Payment`, `Order Confirmed!`, `Delivery time`, `Track Order`, `Track my order` | Form-plus-summary screen with sticky CTA followed by confirmation and tracking states | Confirm, payment, confirmed, and live delivery are sequential states of the same checkout flow | High |
| Orders | `My Orders` with `Active`, `Completed`, `Cancelled`; `History`; `Order Details`; `Live Tracking`; `Order Delivered!`; `Leave a Review`; cancel-order flow | Segmented list plus detail/status subflows | Active/completed/cancelled are tab variants; delivered/cancelled/review are post-order state variants | Medium |
| Profile / Account | Account hub with `My Profile`, `Delivery Address`, `Payment Methods`, `Help & FAQs`, `Settings`, `Log Out`; plus `Update Profile`, `Add New Address`, `Add Card` | Settings/list shell with rows leading into detail forms | Address and payment screens are collection-management variants of the same account pattern | Medium |
| Support / Help | `Contact Us`, `Help Center`, `Help`, `Support`, FAQ search, order issue selection, support chat-style prompt | List/detail help shell with a support conversation variant | FAQ list, contact methods, and support chat are three support surfaces sharing the same feature area | Low |

## Repeated Screen Families

1. Full-screen intro shell: splash, onboarding slides, order-confirmed, order-cancelled, delivered.
2. Auth/form shell: login, sign-up, password reset, add address, add card, password setting, profile update.
3. Feed/list shell: home, search results, favorites, notifications, completed orders, cancelled orders.
4. Configurable detail shell: product detail with option groups and sticky action.
5. Summary shell: cart, confirm order, payment, order details.
6. Segmented status shell: `Active / Completed / Cancelled`, `FAQ / Contact Us`.
7. Account/settings shell: profile hub, settings, notification setting, payment methods, delivery addresses.
8. Support shell: help center search/list and support conversation entry.

## Important Screen Variants To Keep Unified

- The auth screens should share one base template with configurable fields and footer actions.
- Search results across food categories should reuse one result-list pattern with data-only differences.
- Product detail screens should share one base layout and swap only the option selector block.
- Cart, confirm order, payment, and order details should share one pricing-summary block.
- Order confirmation, order cancelled, and order delivered should share one success/status template.
- Address, card, and profile-edit forms should share one account form shell.

## Suggested Implementation Order

1. Build the shared navigation shell, search header, category chips, product cards, and summary rows.
2. Build `Home / Discovery` and one `Search / Filter` list path.
3. Build one reusable `Product Detail / Menu` template with quantity stepper and option groups.
4. Build `Cart` and the happy-path `Checkout` flow through `Order Confirmed!` and basic delivery tracking.
5. Build `Orders` on top of the same summary and status components.
6. Build `Profile / Account` forms and reusable settings rows.
7. Build `Support / Help`, `Favorites`, and `Notifications`.
8. Add polished `Launch` and `Onboarding` once the main ordering loop is stable.

## Notes For Implementation

- The PDF clearly repeats content structures more than it defines unique layouts. Favor a small number of reusable screen shells.
- Several screens appear visually rich, but the reliable value here is flow sequencing and component reuse, not exact spacing or art placement.
- Some labels imply hidden steps, such as forgot-password entry and notification detail, but the visible screen set is enough to define feature boundaries.
