"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/common";
import { Product, FAQ } from "@/types";
import productsData from "@/data/products.json";
import faqData from "@/data/faq.json";
import { useCart } from "@/context";

const products = productsData as Product[];
const faqs = faqData as FAQ[];

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All products undergo rigorous third-party testing",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: Award,
    title: "Premium Ingredients",
    description: "Sourced from trusted suppliers worldwide",
  },
];

export default function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                Premium Quality Supplements
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fuel Your Health with{" "}
                <span className="text-primary">Premium</span> Supplements
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover our curated selection of high-quality vitamins, minerals,
                and herbal supplements designed to support your wellness journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="transition-hover hover-scale">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#faq">
                  <Button variant="outline" size="lg" className="transition-hover">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <Image
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800"
                alt="Premium supplements"
                fill
                className="object-cover rounded-2xl relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 bg-background shadow-sm">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Best Sellers
              </h2>
              <p className="text-muted-foreground">
                Our most popular products loved by thousands
              </p>
            </div>
            <Link href="/products?filter=bestsellers">
              <Button variant="ghost" className="transition-hover">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {bestSellers.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Multivitamins", slug: "multivitamins" },
              { name: "Minerals", slug: "minerals" },
              { name: "Herbal", slug: "herbal" },
              { name: "Protein", slug: "protein" },
              { name: "Omega", slug: "omega" },
              { name: "Probiotics", slug: "probiotics" },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
              >
                <Card className="group cursor-pointer transition-hover hover-lift border-2 hover:border-primary">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="font-semibold text-center group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our products and services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust Supplementals for their health
            and wellness needs.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              variant="secondary"
              className="transition-hover hover-scale"
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
