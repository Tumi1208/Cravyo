# Feature Map

Source reference: `design/overview/Food Delivery App UI Kit Food App Design Food Mobile App Delivery UI (Community) (Copy).pdf`

This feature map groups the observed PDF screens into implementation slices. It is intentionally flow-focused and avoids treating the PDF as a precise UI spec.

## Feature Slices

| Feature | Screens Observed In PDF | Owns | Depends On | Suggested Phase |
| --- | --- | --- | --- | --- |
| Auth | `Log In`, `New Account`, `Set Password`, social sign-up entry, forgot-password entry point | User entry, account creation, password reset | Shared form shell, buttons, inputs | Medium |
| Home | `Good Morning`, category chips, promo banner, `Best Seller`, `Recommend`, `Recommendations`, notification entry | Discovery feed and browse entry points | Search input, product cards, section headers | High |
| Search | Search-result lists, category-specific browse lists, `Filter`, `Sort by` | Querying and narrowing browse results | Home taxonomy, chips, filter block, product cards | High |
| Menu | Product detail screens for appetizer, seafood, burger, dessert, drink, pizza | Item detail, customization, add-to-cart handoff | Search/home browse surfaces, option groups, quantity stepper | High |
| Cart | Empty cart and filled cart | Line items, quantity editing, pricing summary | Menu add-to-cart path, summary rows | High |
| Checkout | `Confirm Order`, `Payment`, `Order Confirmed!`, delivery progress | Address selection, payment selection, final order placement | Cart, address rows, payment rows, status timeline | High |
| Orders | `My Orders`, `History`, `Order Details`, `Live Tracking`, `Order Delivered!`, review flow, cancel flow | Post-purchase management and order status | Checkout completion, order cards, status timeline, review form | Medium |
| Favorites | `Favorites` saved dish list | Saved items browsing | Product cards and browse taxonomy | Low |
| Notifications | `Notifications`, promotion and delivery alerts | Lightweight user updates | Orders and promotions data | Low |
| Profile | Account hub, `My profile`, `Delivery Address`, `Add New Address`, `Payment Methods`, `Add Card`, `Settings`, `Notification Setting`, `Password Setting`, logout confirmation | Account management and saved preferences | Shared form shell, settings rows, address/payment rows | Medium |
| Support | `Contact Us`, `Help Center`, `Help`, `Support`, FAQ search, order issue support | FAQ, contact channels, order-help entry | Orders context, search input, settings/list rows | Low |
| Launch / Onboarding | Splash, brand entry, `Order for Food`, `Easy Payment`, `Fast Delivery` | First-run introduction | Full-screen intro shell only | Later |

## Recommended Delivery Order

1. `Home`, `Search`, and `Menu`
2. `Cart` and the happy-path `Checkout`
3. `Orders`
4. `Profile`
5. `Support`
6. `Favorites` and `Notifications`
7. `Auth`
8. `Launch / Onboarding`

## Why This Order Fits The PDF

- The PDF repeats discovery, product detail, cart, and order states far more than any other flow. That is the clearest reusable core.
- `Orders` reuses the same summary and status patterns introduced by checkout, so it should come after the transactional path.
- `Profile` shares form/list patterns with checkout, so it benefits from those foundations.
- `Support`, `Favorites`, and `Notifications` are secondary surfaces built on top of existing cards, rows, and order context.
- `Auth` and onboarding are visually prominent in the deck, but they add less reusable product logic than the browse-to-order loop.

## Shared Boundaries Between Features

- `Home` and `Search` should share taxonomy and product-card presentation.
- `Menu` should emit normalized cart actions instead of owning cart state directly.
- `Cart`, `Checkout`, and `Orders` should share pricing-summary and status models.
- `Profile` should own saved addresses and payment methods, while `Checkout` consumes them.
- `Support` should be able to deep-link from the current order or order history.

## Scope Control Notes

- Keep the first pass centered on the ordering loop, not the full account/settings surface.
- Treat favorites, notifications, and support as adapters around already-built list and card patterns.
- Avoid separate screen implementations when the PDF is only showing content variants of the same layout family.
