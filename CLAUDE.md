- Description -
Your are building a modern e commerce store "Supplementals" a premium supplement store that specializes in quality supplements, multivitamins, minerals, and also herbal supplements. The store focuses on customer's health and provides transparency around details for its products.

- Design Details -
Colors: Use white as the base color and ( #447293 or #365488 or #677563) [you can use these in combinations as well] as primary color. Keep the tone cool.
Images: Hight quality product images (you can use any from publically available url related to the product).
Responsiveness: Make the design responsive to different resolutions i.e: media for 320px, 768px, 1024px, 1440px
Animation: Add animation and transitions over hover on interactive components (such as button).
Font: Use Poppin Bold for healines and for text use simple poppin and for labels use Nunito.

- Product Requirement -
    Core requriement:
        The app is dual interface e-commerce web application with customer facing storefront and admin provider portal.

    Customer Storefront (Feature):
        Homepage:
            Display Best selling products in carousel (use dummy data)
            Show a expandable FAQ section
        Products:
            Show all products in grid layout (use dummy data)
            Allow filtering based on category, price range and best sellers.
            Allow searching based on product name and product description.
            Allow sorting based on price (High to low, low to high), alphabetical, best sellers as priority
        Product Details:
            Support dynamic routing for each product
            Display extensive product details
            Add to cart functionality
        Cart:
            Non persistent cart.
            Allow single quanity limit per product to be purchased.
            Allow add/remove products from the cart
            Show cart summary
            Allow clear cart functionality
            Allow user to proceed to checkout
        Checkout:
            User should be able to access checkout via cart page
            Checkout should contain all required fields for shipping information along with a detailed summary of orders
            Once user checkouts, the order should be visible in provider store (non persistant)

    Provider Portal (Feature): [Use dummy login credentials]
        User should be able to access a login page from homepage to access provider portal. Once logged in, there should be a logout button to exit provider portal and go back to customer storefront.
        All Orders:
            Show a paginated orders table (use dummy data) [This list would also include any orders made via Customer storefront]
            Allow searching based on order id, product name and customer name
            Allow filtering based on date range and order status
        Order Details:
            Dynamic routing for each order
            Display complete order information including (summary, customer details, product list)
            Allow order status to be changed (from pending to inprogress or complete)

- Technical Requirement -
    responsiveness design across all devices.
    Header navigation and footer on all pages (Both storefront and provider)
    Dynamic routing for all procuts and order
    No need to persist data between page refreshes

    Deliverable:
        A fully featured ecommerce store with customer shopping services and a provider portal for order management system.

- Techincal Details -
    Make sure to follow these rules at all cost.
    Create a Next.js (Typescript) app with shadcn/ui (Make sure to use shadcn for component designs as much as you can)
    Use TailwindCSS for styling
    Create proper types using Typescript for products (name, category, price, description, best seller), orders (order id, customer details, products list, order status, date of purchase)
    Create JSON data in separate folder and add dummy data files for products, order, faq. Make sure to add enough dummy (Use actual valid data) data for both products and order.
    Create context providers for cart (CartContext) and order (OrderContext). Use hooks for managing cart (all cart related functionalities must be included such as adding item to cart, removing etc) and order (All order management related activites must be included such as getting order details, changing status etc).
    Make sure to create common utilities and components for repeated functionality.
    For filtering, searcning and sorting use useState hooks.
    Implement cart (app/store/cart) and checkout (app/store/checkout)
    Implement form for checkout and use cart context hook for displaying all the details arouind the order and items.
    Allow updation of items quantity in car (add or remove one item per time).
    If all items are removed from the carts, the functionality should replicate that of the clear cart implementation.
    Make sure the calculation of amount and quantity is accurate and should also reflect the same in provider portal after checkout is completed.
    Make sure to divide routing into:
        storefront (Customer)
        provider (Admin)

    Dynamic Routing pattern:
    /product/[id]
    /provider/order/[id]
