export type Language = "en" | "ar" | "fr";

export const translations: Record<string, Record<Language, string>> = {
  // Nav
  "nav.home": { en: "Home", ar: "الرئيسية", fr: "Accueil" },
  "nav.newArrivals": { en: "New Arrivals", ar: "وصل حديثاً", fr: "Nouveautés" },
  "nav.bestSellers": { en: "Best Sellers", ar: "الأكثر مبيعاً", fr: "Meilleures ventes" },
  "nav.aboutUs": { en: "About Us", ar: "من نحن", fr: "À propos" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا", fr: "Contact" },
  "nav.login": { en: "Login", ar: "تسجيل الدخول", fr: "Connexion" },
  "nav.dashboard": { en: "Dashboard", ar: "لوحة التحكم", fr: "Tableau de bord" },
  "nav.myAccount": { en: "My Account", ar: "حسابي", fr: "Mon compte" },
  "nav.logout": { en: "Logout", ar: "تسجيل الخروج", fr: "Déconnexion" },
  "nav.facebook": { en: "Facebook", ar: "فيسبوك", fr: "Facebook" },
  "nav.instagram": { en: "Instagram", ar: "إنستغرام", fr: "Instagram" },
  "nav.pinterest": { en: "Pinterest", ar: "بينتريست", fr: "Pinterest" },

  // Footer
  "footer.copyright": {
    en: "© 2026 Hollah. All rights reserved.",
    ar: "© 2026 هولاه. جميع الحقوق محفوظة.",
    fr: "© 2026 Hollah. Tous droits réservés.",
  },
  "footer.rights": {
    en: "All rights reserved. Built with love for modest elegance.",
    ar: "جميع الحقوق محفوظة. صُنع بحب للأناقة المحتشمة.",
    fr: "Tous droits réservés. Conçu avec amour pour l'élégance modeste.",
  },

  // Search
  "search.title": { en: "Search Catalog", ar: "ابحث في الكتالوج", fr: "Rechercher dans le catalogue" },
  "search.placeholder": {
    en: "Search for Abayas, Kaftans, Cape Overlays...",
    ar: "ابحث عن عباءات، قفاطين، كيب أوفرلاي...",
    fr: "Recherchez des Abayas, Kaftans, Cape Overlays...",
  },
  "search.filteredResults": { en: "Filtered Results", ar: "نتائج التصفية", fr: "Résultats filtrés" },
  "search.noResults": {
    en: 'No products found matching "{query}"',
    ar: 'لا توجد منتجات تطابق "{query}"',
    fr: 'Aucun produit trouvé pour "{query}"',
  },

  // Cart
  "cart.title": { en: "Your Cart", ar: "سلة التسوق", fr: "Votre panier" },
  "cart.empty": { en: "Your cart is empty", ar: "سلة التسوق فارغة", fr: "Votre panier est vide" },
  "cart.emptyDescription": {
    en: "Discover our elegant arrivals to add pieces here.",
    ar: "اكتشفي تشكيلتنا الأنيقة لإضافة قطع إلى سلتك.",
    fr: "Découvrez nos arrivages élégants pour ajouter des articles ici.",
  },
  "cart.continueShopping": { en: "Continue Shopping", ar: "متابعة التسوق", fr: "Continuer mes achats" },
  "cart.subtotal": { en: "Subtotal", ar: "المجموع الفرعي", fr: "Sous-total" },
  "cart.shippingNote": {
    en: "Shipping and discounts calculated at checkout.",
    ar: "يتم حساب الشحن والخصومات عند الدفع.",
    fr: "Les frais de livraison et les réductions sont calculés lors du paiement.",
  },
  "cart.checkout": { en: "PROCEED TO SECURE CHECKOUT", ar: "المتابعة إلى الدفع الآمن", fr: "PROCÉDER AU PAIEMENT SÉCURISÉ" },

  // Profile
  "profile.signIn": { en: "Sign In", ar: "تسجيل الدخول", fr: "Connexion" },
  "profile.joinUs": { en: "Join Us", ar: "انضمي إلينا", fr: "Rejoignez-nous" },
  "profile.welcomeBack": { en: "Welcome Back Queen", ar: "مرحباً بعودتك يا ملكة", fr: "Bon retour parmi nous, Reine" },
  "profile.becomeQueen": { en: "Become a Modest Queen", ar: "كوني ملكة الأناقة المحتشمة", fr: "Devenez une Reine Modeste" },
  "profile.email": { en: "Email Address", ar: "البريد الإلكتروني", fr: "Adresse e-mail" },
  "profile.emailPlaceholder": { en: "name@email.com", ar: "name@email.com", fr: "name@email.com" },
  "profile.password": { en: "Password", ar: "كلمة المرور", fr: "Mot de passe" },
  "profile.passwordPlaceholder": { en: "••••••••", ar: "••••••••", fr: "••••••••" },
  "profile.fullName": { en: "Full Name", ar: "الاسم الكامل", fr: "Nom complet" },
  "profile.namePlaceholder": { en: "Amina Al-Mansour", ar: "أمينة المنصور", fr: "Amina Al-Mansour" },
  "profile.forgotPassword": { en: "Forgot Password?", ar: "نسيت كلمة المرور؟", fr: "Mot de passe oublié ?" },
  "profile.signInBtn": { en: "SIGN IN", ar: "تسجيل الدخول", fr: "SE CONNECTER" },
  "profile.createAccount": { en: "CREATE ACCOUNT", ar: "إنشاء حساب", fr: "CRÉER UN COMPTE" },
  "profile.agreement": {
    en: "By joining, you agree to receive rewards, newsletters, and exclusive product updates from Hollah.",
    ar: "بانضمامك، فإنك توافق على تلقي المكافآت والنشرات الإخبارية والتحديثات الحصرية من هولاه.",
    fr: "En rejoignant, vous acceptez de recevoir des récompenses, des newsletters et des mises à jour exclusives de Hollah.",
  },

  // Hero
  "hero.tagline": {
    en: "FOR WEDDINGS - EID - EVERY CELEBRATION",
    ar: "للأعراس - العيد - كل المناسبات",
    fr: "MARIAGES - AÏD - TOUTES LES FÊTES",
  },
  "hero.title": { en: "To be in The Best Hollah", ar: "لتكوني في أفضل حال", fr: "Être dans la meilleure Hollah" },
  "hero.buyNow": { en: "BUY NOW", ar: "تسوق الآن", fr: "ACHETER" },
  "hero.discover": { en: "DISCOVER", ar: "اكتشفي", fr: "DÉCOUVRIR" },

  // Sections
  "section.newArrivals": { en: "New Arrivals", ar: "وصل حديثاً", fr: "Nouveautés" },
  "section.bestSellers": { en: "Best Sellers", ar: "الأكثر مبيعاً", fr: "Meilleures ventes" },

  // Product
  "product.review": { en: "Review", ar: "تقييم", fr: "Avis" },
  "product.reviews": { en: "Reviews", ar: "تقييمات", fr: "Avis" },

  // About
  "about.philosophy": { en: "Our Philosophy", ar: "فلسفتنا", fr: "Notre philosophie" },
  "about.title": {
    en: "Inspired by Faith, Tailored for Elegance",
    ar: "مستوحاة من الإيمان، مُصممة للأناقة",
    fr: "Inspirée par la foi, conçue pour l'élégance",
  },
  "about.description": {
    en: "At Hollah, we design with the belief that modesty and sophistication go hand in hand. Every piece is crafted from premium silks, velvet overlays, and intricate beads designed to bring comfort, confidence, and grace to weddings, Eid, and everyday outings.",
    ar: "في هولاه، نصمم بإيمان أن المحتشمة والأناقة تسيران جنباً إلى جنب. كل قطعة مصنوعة من الحرير الفاخر وأقمشة المخمل والخرز المتقن، صممت لتمنحك الراحة والثقة والأناقة في الأعراس والعيد والخروجات اليومية.",
    fr: "Chez Hollah, nous concevons avec la conviction que la modestie et la sophistication vont de pair. Chaque pièce est confectionnée à partir de soies premium, de voiles en velours et de perles complexes, conçues pour apporter confort, confiance et grâce aux mariages, à l'Aïd et aux sorties quotidiennes.",
  },

  // Newsletter
  "newsletter.title": {
    en: "Join Our Community of Modest Queens",
    ar: "انضمي إلى مجتمع ملكات الأناقة",
    fr: "Rejoignez notre communauté de Reines Modestes",
  },
  "newsletter.description": {
    en: "Be the first to discover new arrivals, exclusive offers, and timeless pieces inspired by faith and elegance.",
    ar: "كوني أول من يكتشف الوافد الجديد والعروض الحصرية والقطع الخالدة المستوحاة من الإيمان والأناقة.",
    fr: "Soyez la première à découvrir les nouveautés, les offres exclusives et les pièces intemporelles inspirées par la foi et l'élégance.",
  },
  "newsletter.emailPlaceholder": { en: "Your Email", ar: "بريدك الإلكتروني", fr: "Votre e-mail" },
  "newsletter.subscribe": { en: "SUBSCRIBE", ar: "اشتراك", fr: "S'ABONNER" },
  "newsletter.subscribing": { en: "Subscribing...", ar: "جارٍ الاشتراك...", fr: "Inscription en cours..." },
  "newsletter.thankYou": {
    en: "Thank you for joining our community!",
    ar: "شكراً لانضمامك إلى مجتمعنا!",
    fr: "Merci d'avoir rejoint notre communauté !",
  },

  // Toast messages
  "toast.addedToCart": {
    en: "Added {product} ({color}) to cart",
    ar: "تمت إضافة {product} ({color}) إلى السلة",
    fr: "{product} ({color}) ajouté au panier",
  },
  "toast.removedWishlist": { en: "Removed from wishlist", ar: "تمت الإزالة من قائمة الرغبات", fr: "Retiré de la liste de souhaits" },
  "toast.addedWishlist": { en: "Added to wishlist", ar: "تمت الإضافة إلى قائمة الرغبات", fr: "Ajouté à la liste de souhaits" },
  "toast.removedCart": { en: "Item removed from cart", ar: "تمت إزالة العنصر من السلة", fr: "Article retiré du panier" },
  "toast.subscriptionSuccess": { en: "Subscription successful!", ar: "تم الاشتراك بنجاح!", fr: "Abonnement réussi !" },
  "toast.loginSuccess": { en: "Logged in successfully!", ar: "تم تسجيل الدخول بنجاح!", fr: "Connexion réussie !" },
  "toast.registerSuccess": { en: "Registered successfully!", ar: "تم التسجيل بنجاح!", fr: "Inscription réussie !" },
  "toast.loyalty": {
    en: "Opening Loyalty Rewards program...",
    ar: "جارٍ فتح برنامج مكافآت الولاء...",
    fr: "Ouverture du programme de récompenses...",
  },
  "toast.support": {
    en: "Connecting to live support...",
    ar: "جارٍ الاتصال بالدعم المباشر...",
    fr: "Connexion au support en direct...",
  },
  "toast.scrollNewArrivals": {
    en: "Scrolling to New Arrivals collection",
    ar: "جارٍ التمرير إلى تشكيلة الوافد الجديد",
    fr: "Défilement vers la collection Nouveautés",
  },
  "toast.scrollBrandStory": {
    en: "Scrolling to Brand Story",
    ar: "جارٍ التمرير إلى قصة العلامة التجارية",
    fr: "Défilement vers l'histoire de la marque",
  },
  "toast.redirectCheckout": {
    en: "Redirecting to secure checkout...",
    ar: "جارٍ إعادة التوجيه إلى الدفع الآمن...",
    fr: "Redirection vers le paiement sécurisé...",
  },
  "toast.selectedItem": { en: "Selected {product}", ar: "تم اختيار {product}", fr: "{product} sélectionné" },

  // Alt texts
  "alt.logo": { en: "Hollah logo", ar: "شعار هولاه", fr: "Logo Hollah" },
  "alt.heroBackground": {
    en: "Hero Background Cover - Hollah Abaya",
    ar: "صورة الخلفية الرئيسية - عباءة هولاه",
    fr: "Image de fond - Hollah Abaya",
  },
  "alt.coverDivider": {
    en: "Hollah midsection cover divider - Modest Luxury",
    ar: "فاصل هولاه الزخرفي - الفخامة المحتشمة",
    fr: "Diviseur de couverture Hollah - Luxe Modeste",
  },
  "alt.newsletterBg": {
    en: "Newsletter background texture - Hollah community",
    ar: "خلفية النشرة البريدية - مجتمع هولاه",
    fr: "Texte de fond de la newsletter - Communauté Hollah",
  },
  "alt.footerLogo": {
    en: "Hollah footer logo",
    ar: "شعار هولاه السفلي",
    fr: "Logo Hollah pied de page",
  },

  // ARIA / Labels
  "aria.toggleMenu": { en: "Toggle Menu", ar: "فتح/إغلاق القائمة", fr: "Ouvrir/Fermer le menu" },
  "aria.search": { en: "Search", ar: "بحث", fr: "Rechercher" },
  "aria.profile": { en: "Profile Account", ar: "حسابي", fr: "Mon compte" },
  "aria.shoppingCart": { en: "Shopping Cart", ar: "سلة التسوق", fr: "Panier" },
  "aria.addWishlist": { en: "Add to wishlist", ar: "أضف إلى قائمة الرغبات", fr: "Ajouter à la liste de souhaits" },
  "aria.addCart": { en: "Add to cart", ar: "أضف إلى السلة", fr: "Ajouter au panier" },

  // Tooltips
  "tooltip.loyalty": { en: "Loyalty Rewards", ar: "مكافآت الولاء", fr: "Récompenses de fidélité" },
  "tooltip.support": { en: "Customer Support", ar: "دعم العملاء", fr: "Support client" },

  // Dashboard
  "dashboard.title": { en: "Dashboard", ar: "لوحة التحكم", fr: "Tableau de bord" },
  "dashboard.welcome": { en: "Welcome back, {name}", ar: "مرحباً بعودتك، {name}", fr: "Bon retour, {name}" },
  "dashboard.totalOrders": { en: "Total Orders", ar: "إجمالي الطلبات", fr: "Total des commandes" },
  "dashboard.pendingOrders": { en: "Pending Orders", ar: "طلبات معلقة", fr: "Commandes en attente" },
  "dashboard.totalProducts": { en: "Total Products", ar: "إجمالي المنتجات", fr: "Total des produits" },
  "dashboard.totalUsers": { en: "Total Users", ar: "إجمالي المستخدمين", fr: "Total des utilisateurs" },
  "dashboard.totalRevenue": { en: "Total Revenue", ar: "إجمالي الإيرادات", fr: "Chiffre d'affaires total" },
  "dashboard.recentOrders": { en: "Recent Orders", ar: "الطلبات الأخيرة", fr: "Commandes récentes" },
  "dashboard.viewAll": { en: "View All", ar: "عرض الكل", fr: "Voir tout" },
  "dashboard.noOrders": { en: "No orders yet", ar: "لا توجد طلبات بعد", fr: "Aucune commande pour le moment" },
  "dashboard.products": { en: "Products", ar: "المنتجات", fr: "Produits" },
  "dashboard.addProduct": { en: "Add Product", ar: "إضافة منتج", fr: "Ajouter un produit" },
  "dashboard.editProduct": { en: "Edit Product", ar: "تعديل المنتج", fr: "Modifier le produit" },
  "dashboard.orders": { en: "Orders", ar: "الطلبات", fr: "Commandes" },
  "dashboard.users": { en: "Users", ar: "المستخدمين", fr: "Utilisateurs" },
  "dashboard.shippingAddress": { en: "Shipping Address", ar: "عنوان الشحن", fr: "Adresse de livraison" },
  "dashboard.updateStatus": { en: "Update Status", ar: "تحديث الحالة", fr: "Mettre à jour le statut" },
  "dashboard.viewStore": { en: "View Store", ar: "عرض المتجر", fr: "Voir la boutique" },
  "dashboard.adminPanel": { en: "Admin Panel", ar: "لوحة الإدارة", fr: "Panneau d'administration" },

  // Product Page
  "product.fillInformation": { en: "Fill in the information to place the order", ar: "أدخل المعلومات اللازمة لإتمام طلبك", fr: "Remplissez les informations pour passer la commande" },
  "product.name": { en: "Full Name", ar: "الاسم الكامل", fr: "Nom complet" },
  "product.phone": { en: "Phone Number", ar: "رقم الهاتف", fr: "Numéro de téléphone" },
  "product.wilaya": { en: "Wilaya", ar: "الولاية", fr: "Wilaya" },
  "product.commune": { en: "Commune", ar: "البلدية", fr: "Commune" },
  "product.buy": { en: "Buy Now", ar: "اشتري الان", fr: "Acheter maintenant" },
  "product.addToCartBtn": { en: "Add to Cart", ar: "أضف للسلة", fr: "Ajouter au panier" },
  "product.youMayAlsoLike": { en: "You may also like", ar: "قد يعجبك أيضاً", fr: "Vous aimerez peut-être aussi" },
  "product.color": { en: "Color", ar: "اللون", fr: "Couleur" },
  "product.size": { en: "Size", ar: "المقاس", fr: "Taille" },
  "product.off": { en: "OFF", ar: "تخفيض", fr: "OFF" },
  "product.notFound": { en: "Product not found", ar: "المنتج غير موجود", fr: "Produit introuvable" },
  "product.title.moa002": {
    en: "Luxury Floral Lace Embroidered Open Abaya For Eid & Wedding (MOA002)",
    ar: "عباية مفتوحة مطرزة بدانتيل فاخر بنقوش زهرية،مثالية للعيد والزفاف (MOA002)",
    fr: "Abaya ouverte brodée de dentelle florale de luxe pour l'Aïd et le mariage (MOA002)"
  },
  "product.desc.moa002": {
    en: "Experience timeless luxury with the Fulla Abaya collection. Crafted from high-grade lightweight fabric, this modest ensemble features intricate embellishments, fluid drape, and graceful tailoring designed for Eid, weddings, and special celebrations.",
    ar: "تألقي بأناقة استثنائية مع مجموعة عبايات فُلّة الفاخرة. صُممت بحرفية عالية من أجود أنواع الأقمشة الخفيفة والانسيابية، وتتميز بتطريزات راقية وقصة مريحة تمنحك إطلالة ملكية محتشمة تعكس الفخامة في العيد والأعراس والمناسبات الخاصة.",
    fr: "Sublimez votre allure avec la collection d'Abayas Fulla. Confectionnée avec soin dans des tissus fluides et légers de première qualité, cette pièce allie finitions raffinées et coupe élégante pour vous offrir une grâce royale lors de l'Aïd, des mariages et de vos événements précieux."
  },
  "product.desc.threePieces": {
    en: "The 3-Piece Fulla Abaya Set features a flowing outer cape overlay, matching inner dress, and a coordinating hijab scarf. Adorned with delicate crystal beadwork along the cuffs and neckline, this ensemble offers supreme comfort and regal modesty for weddings and festive occasions.",
    ar: "طقم عباية فُلّة الملكي المكون من 3 قطع: كيب خارجي انسابي، فستان داخلي متناسق، وشال حجاب مطابق. مطرز بالخرز والكريستال اللامع على الأكمام وياقة العباية، يمنحك راحة فائقة وأناقة محتشمة راقية في المناسبات والأعراس.",
    fr: "L'ensemble Abaya Fulla 3 pièces se compose d'une cape extérieure fluide, d'une robe intérieure assortie et d'un hijab coordonné. Orné de perles de cristal délicates sur les poignets et l'encolure, cet ensemble offre un confort d'exception et une modestie royale pour les mariages et célébrations."
  },
  "product.desc.twoPieces": {
    en: "The 2-Piece Fulla Abaya Set combines a tailored open abaya with an inner sleeveless slip dress. Designed with light, breathable premium fabric and refined stitching details, it delivers effortless elegance for both special events and sophisticated everyday wear.",
    ar: "طقم عباية فُلّة الأنيق المكون من قطعتين: عباية مفتوحة ذات قصة متقنة وفستان داخلي بدون أكمام. مصنوع من قماش فاخر خفيف وينساب بنعومة، يمنحك إطلالة عصرية محتشمة تجمع بين الفخامة والراحة اليومية وفي المناسبات.",
    fr: "L'ensemble Abaya Fulla 2 pièces combine une abaya ouverte structurée avec une robe d'intérieur sans manches. Conçu dans un tissu léger de haute qualité avec des coutures soignées, il garantit une élégance naturelle pour vos sorties chic et vos événements."
  },
  "product.learnMore": { en: "Learn more", ar: "إقرأ المزيد", fr: "En savoir plus" },
  "color.Black": { en: "Black", ar: "أسود", fr: "Noir" },
  "color.White": { en: "White", ar: "أبيض", fr: "Blanc" },
  "color.deepPlum": { en: "Deep Plum", ar: "خوخي غامق", fr: "Prune foncée" },
  "color.midnightNavy": { en: "Midnight Navy", ar: "كحلي داكن", fr: "Bleu marine" },
  "color.velvetWine": { en: "Velvet Wine", ar: "عنابي مخملي", fr: "Vin velours" },
  "color.blossomPink": { en: "Blossom Pink", ar: "وردي زهر", fr: "Rose fleur" },
  "color.gildedGold": { en: "Gilded Gold", ar: "ذهبي مذهب", fr: "Or doré" },
  "color.softLavender": { en: "Soft Lavender", ar: "خزامى ناعم", fr: "Lavande douce" },
  "product.collection": { en: "FULLA'S COLLECTION", ar: "مجموعة فلة", fr: "COLLECTION FULLA" },
  "product.quantity": { en: "Quantity", ar: "الكمية", fr: "Quantité" },
  "product.total": { en: "Total", ar: "المجموع", fr: "Total" },
  "order.errorRequired": { en: "Please fill in all fields (Name, Phone, Wilaya, Commune)", ar: "يرجى ملء جميع الحقول المطلوبة (الاسم، رقم الهاتف، الولاية، البلدية)", fr: "Veuillez remplir tous les champs (Nom, Téléphone, Wilaya, Commune)" },
  "order.phoneHint": { 
    en: "Must be 10 digits starting with 05, 06, or 07 (e.g. 0655123456)", 
    ar: "يجب أن يتكون من 10 أرقام ويبدأ بـ 05 أو 06 أو 07 (مثال: 0655123456)", 
    fr: "Doit comporter 10 chiffres commençant par 05, 06 ou 07 (ex: 0655123456)" 
  },
  "order.errorPhone": { 
    en: "Invalid phone number! It must start with 05, 06, or 07 and be exactly 10 digits (e.g. 0655123456)", 
    ar: "رقم الهاتف غير صحيح! يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام تماماً (مثال: 0655123456)", 
    fr: "Numéro de téléphone incorrect ! Il doit commencer par 05, 06 ou 07 et comporter exactement 10 chiffres (ex: 0655123456)" 
  },
  "order.submitting": { en: "Placing order...", ar: "جارٍ تأكيد الطلب...", fr: "Enregistrement de la commande..." },

  // Thank You Page
  "thankyou.badge": { en: "Order Confirmed", ar: "تم تأكيد طلبك بنجاح", fr: "Commande confirmée" },
  "thankyou.title": { en: "Thank You For Your Order!", ar: "شكراً لثقتك بنا!", fr: "Merci pour votre commande !" },
  "thankyou.subtitle": {
    en: "Your order has been received successfully. Our customer support team will contact you by phone to confirm your delivery details.",
    ar: "تم استلام طلبك بنجاح. سيتصل بك فريق خدمة العملاء هاتفياً لتأكيد تفاصيل وموعد التوصيل.",
    fr: "Votre commande a été reçue avec succès. Notre service client vous contactera par téléphone pour confirmer les détails de livraison."
  },
  "thankyou.orderSummary": { en: "Order Summary", ar: "ملخص الطلب", fr: "Résumé de la commande" },
  "thankyou.orderNumber": { en: "Order Reference", ar: "رقم الطلب", fr: "Référence commande" },
  "thankyou.product": { en: "Product", ar: "المنتج", fr: "Produit" },
  "thankyou.details": { en: "Options", ar: "المواصفات", fr: "Options" },
  "thankyou.customerInfo": { en: "Delivery Information", ar: "معلومات التوصيل", fr: "Informations de livraison" },
  "thankyou.fullName": { en: "Full Name", ar: "الاسم الكامل", fr: "Nom complet" },
  "thankyou.phone": { en: "Phone", ar: "الهاتف", fr: "Téléphone" },
  "thankyou.location": { en: "Address", ar: "العنوان", fr: "Adresse" },
  "thankyou.paymentMethod": { en: "Payment Method", ar: "طريقة الدفع", fr: "Mode de paiement" },
  "thankyou.cod": { en: "Cash on delivery (Pay when you receive)", ar: "الدفع عند الاستلام (الدفع بعد فحص المنتج)", fr: "Paiement à la livraison (à la réception)" },
  "thankyou.guarantee": {
    en: "100% Quality & Authenticity Guaranteed",
    ar: "ضمان الجودة والأصالة بنسبة 100%",
    fr: "Garantie 100% Qualité et Authenticité"
  },
  "thankyou.backToHome": { en: "Return to Home", ar: "العودة إلى الصفحة الرئيسية", fr: "Retour à l'accueil" },
  "thankyou.whatsapp": { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب", fr: "Contacter sur WhatsApp" }
};

