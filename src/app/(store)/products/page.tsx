"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/common";
import { Product, ProductCategory, SortOption } from "@/types";
import productsData from "@/data/products.json";

const products = productsData as Product[];

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "multivitamins", label: "Multivitamins" },
  { value: "minerals", label: "Minerals" },
  { value: "herbal", label: "Herbal" },
  { value: "protein", label: "Protein" },
  { value: "omega", label: "Omega" },
  { value: "probiotics", label: "Probiotics" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "best-sellers", label: "Best Sellers First" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "alphabetical", label: "Alphabetical" },
];

const priceRanges = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "under-20", label: "Under $20", min: 0, max: 20 },
  { value: "20-30", label: "$20 - $30", min: 20, max: 30 },
  { value: "30-50", label: "$30 - $50", min: 30, max: 50 },
  { value: "over-50", label: "Over $50", min: 50, max: Infinity },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") as ProductCategory | null;
  const urlFilter = searchParams.get("filter");

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("best-sellers");
  const [priceRange, setPriceRange] = useState("all");
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Set initial values from URL params
  useEffect(() => {
    if (urlCategory && categories.some(c => c.value === urlCategory)) {
      setCategory(urlCategory);
    }
    if (urlFilter === "bestsellers") {
      setBestSellersOnly(true);
    }
  }, [urlCategory, urlFilter]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Filter by price range
    const selectedRange = priceRanges.find((r) => r.value === priceRange);
    if (selectedRange && priceRange !== "all") {
      result = result.filter(
        (p) => p.price >= selectedRange.min && p.price < selectedRange.max
      );
    }

    // Filter by best sellers
    if (bestSellersOnly) {
      result = result.filter((p) => p.isBestSeller);
    }

    // Sort products
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "alphabetical":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "best-sellers":
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [searchQuery, category, sortBy, priceRange, bestSellersOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setSortBy("best-sellers");
    setPriceRange("all");
    setBestSellersOnly(false);
  };

  const hasActiveFilters =
    searchQuery || category !== "all" || priceRange !== "all" || bestSellersOnly;

  const FilterControls = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-2">
        <Label className="font-semibold">Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as ProductCategory | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label className="font-semibold">Price Range</Label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Best Sellers Toggle */}
      <div className="space-y-2">
        <Label className="font-semibold">Best Sellers</Label>
        <Button
          variant={bestSellersOnly ? "default" : "outline"}
          className="w-full justify-start transition-hover"
          onClick={() => setBestSellersOnly(!bestSellersOnly)}
        >
          {bestSellersOnly ? "Showing Best Sellers" : "Show Best Sellers Only"}
        </Button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="w-full transition-hover"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" className="transition-hover">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterControls />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}
          {category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.value === category)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setCategory("all")}
              />
            </Badge>
          )}
          {priceRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {priceRanges.find((r) => r.value === priceRange)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setPriceRange("all")}
              />
            </Badge>
          )}
          {bestSellersOnly && (
            <Badge variant="secondary" className="gap-1">
              Best Sellers Only
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setBestSellersOnly(false)}
              />
            </Badge>
          )}
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h2>
            <FilterControls />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              {filteredAndSortedProducts.length} product
              {filteredAndSortedProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No products found matching your criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ProductsLoading() {
  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="h-40 bg-muted rounded animate-pulse" />
        </div>
      </aside>
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of premium supplements
        </p>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
