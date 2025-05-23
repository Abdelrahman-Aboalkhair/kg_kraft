import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($first: Int, $skip: Int, $filters: ProductFilters) {
    products(first: $first, skip: $skip, filters: $filters) {
      products {
        id
        slug
        name
        price
        discount
        stock
        images
        isNew
        isFeatured
        isTrending
        isBestSeller
        category {
          id
          name
          slug
        }
        attributes {
          id
          attribute {
            id
            name
            type
            slug
          }
          value {
            id
            value
            slug
          }
          customValue
        }
      }
      hasMore
      totalCount
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($slug: String!) {
    product(slug: $slug) {
      id
      slug
      name
      price
      discount
      stock
      images
      isNew
      isFeatured
      isTrending
      isBestSeller
      category {
        id
        name
        slug
      }

      attributes {
        id
        attribute {
          id
          name
          type
          slug
        }
        value {
          id
          value
          slug
        }
      }
      reviews {
        id
        rating
        comment
      }
    }
  }
`;

export const GET_NEW_PRODUCTS = gql`
  query GetNewProducts($first: Int, $skip: Int) {
    newProducts(first: $first, skip: $skip) {
      products {
        id
        slug
        name
        price
        discount
        stock
        images
        isNew
      }
      hasMore
      totalCount
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($first: Int, $skip: Int) {
    featuredProducts(first: $first, skip: $skip) {
      products {
        id
        slug
        name
        price
        discount
        stock
        images
        isFeatured
      }
      hasMore
      totalCount
    }
  }
`;

export const GET_TRENDING_PRODUCTS = gql`
  query GetTrendingProducts($first: Int, $skip: Int) {
    trendingProducts(first: $first, skip: $skip) {
      products {
        id
        slug
        name
        price
        discount
        stock
        images
        isTrending
      }
      hasMore
      totalCount
    }
  }
`;

export const GET_BEST_SELLER_PRODUCTS = gql`
  query GetBestSellerProducts($first: Int, $skip: Int) {
    bestSellerProducts(first: $first, skip: $skip) {
      products {
        id
        slug
        name
        price
        discount
        stock
        images
        isBestSeller
      }
      hasMore
      totalCount
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      slug
      name
      description
    }
  }
`;

export const GET_ALL_ATTRIBUTES = gql`
  query GetAllAttributes($first: Int, $skip: Int) {
    attributes(first: $first, skip: $skip) {
      id
      name
      slug
      type
      values {
        id
        value
        slug
      }
    }
  }
`;

export const GET_ATTRIBUTE = gql`
  query GetAttribute($id: ID!) {
    attribute(id: $id) {
      id
      name
      slug
      type
      values {
        id
        value
        slug
      }
    }
  }
`;

export const CREATE_ATTRIBUTE = gql`
  mutation CreateAttribute($name: String!, $type: String!) {
    createAttribute(name: $name, type: $type) {
      id
      name
      slug
      type
    }
  }
`;

export const CREATE_ATTRIBUTE_VALUE = gql`
  mutation CreateAttributeValue($attributeId: ID!, $value: String!) {
    createAttributeValue(attributeId: $attributeId, value: $value) {
      id
      value
      slug
    }
  }
`;

export const ASSIGN_ATTRIBUTE_TO_CATEGORY = gql`
  mutation AssignAttributeToCategory(
    $attributeId: ID!
    $categoryId: ID!
    $isRequired: Boolean!
  ) {
    assignAttributeToCategory(
      attributeId: $attributeId
      categoryId: $categoryId
      isRequired: $isRequired
    ) {
      id
      attribute {
        id
        name
      }
      isRequired
    }
  }
`;

export const ASSIGN_ATTRIBUTE_TO_PRODUCT = gql`
  mutation AssignAttributeToProduct(
    $attributeId: ID!
    $productId: ID!
    $valueId: ID
    $customValue: String
  ) {
    assignAttributeToProduct(
      attributeId: $attributeId
      productId: $productId
      valueId: $valueId
      customValue: $customValue
    ) {
      id
      attribute {
        id
        name
      }
      value {
        id
        value
      }
      customValue
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation DeleteAttribute($id: ID!) {
    deleteAttribute(id: $id)
  }
`;
