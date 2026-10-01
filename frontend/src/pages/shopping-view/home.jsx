import { Button } from "@/components/ui/button";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getCarouselImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const iconBadgeColors = [
  "bg-ember/15 text-ember",
  "bg-bark/15 text-bark",
  "bg-espresso/15 text-espresso",
  "bg-mauve/25 text-bark",
  "bg-ember/10 text-ember",
  "bg-bark/20 text-espresso",
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { carouselImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (!carouselImageList.length) return;

    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % carouselImageList.length
      );
    }, 15000);

    return () => clearInterval(timer);
  }, [carouselImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getCarouselImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 pt-6">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
          {carouselImageList && carouselImageList.length > 0
            ? carouselImageList.map((slide, index) => (
                <img
                  src={slide}
                  key={slide}
                  className={`${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                />
              ))
            : null}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + carouselImageList.length) %
                  carouselImageList.length
              )
            }
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-espresso/70 hover:bg-espresso border-0 text-ash"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % carouselImageList.length
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-espresso/70 hover:bg-espresso border-0 text-ash"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <section className="py-12 bg-silver/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-espresso">Shop by category</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-ember" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, index) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full ${
                      iconBadgeColors[index % iconBadgeColors.length]
                    }`}
                  >
                    <categoryItem.icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-ash">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-espresso">Shop by Brand</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-ember" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem, index) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full ${
                      iconBadgeColors[index % iconBadgeColors.length]
                    }`}
                  >
                    <brandItem.icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-silver/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-espresso">Feature Products</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-ember" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
