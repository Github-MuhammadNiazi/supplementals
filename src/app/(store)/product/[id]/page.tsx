"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Check,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/types";
import productsData from "@/data/products.json";
import { useCart } from "@/context";
import { ProductCard } from "@/components/common";

const products = productsData as Product[];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart, getCartItem } = useCart();

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const cartItem = getCartItem(product.id);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.isBestSeller && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              <Star className="h-4 w-4 mr-1 fill-current" />
              Best Seller
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {getCategoryLabel(product.category)}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {product.description}
            </p>
            <p className="text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <Separator />

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">In Stock</p>
              <p className="font-semibold">{product.stock} units</p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Shipping</p>
              <p className="font-semibold">Free $50+</p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Quality</p>
              <p className="font-semibold">Tested</p>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full transition-hover hover-scale"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isInCart(product.id) ? "Add Another" : "Add to Cart"}
            </Button>
            {cartItem && (
              <p className="text-center text-sm text-muted-foreground">
                {cartItem.quantity} in cart
              </p>
            )}
            <Link href="/cart" className="block">
              <Button variant="outline" size="lg" className="w-full transition-hover">
                View Cart
              </Button>
            </Link>
          </div>

          {/* Product Details Accordion */}
          <Accordion type="single" collapsible defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger className="font-semibold">
                Description
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {product.longDescription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="benefits">
              <AccordionTrigger className="font-semibold">
                Benefits
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ingredients">
              <AccordionTrigger className="font-semibold">
                Ingredients
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-muted-foreground text-sm">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dosage">
              <AccordionTrigger className="font-semibold">
                Dosage & Usage
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {product.dosage}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
