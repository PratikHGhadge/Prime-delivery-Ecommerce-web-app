import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { sortOptions } from "./../../product/components/filtersData";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link, Navigate } from "react-router-dom";
import {
  fetchProductsByFilterAndPage,
  fetchAllCategories,
  fetchAllBrands,
} from "../../product/ProductListAPI";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../product/components/Pagination";
import Mobilefilter from "../../product/components/Mobilefilter";
import { sortProducts } from "../../product/ProductSlice";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import DesktopFilters from "../../product/components/DesktopFilters";
import { useNavigate } from "react-router-dom";
import ProductList from "../../product/components/ProductList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalItem, brands, categories } = useSelector(
    (state) => state.products
  );
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const handleButtonClick = () => {
    navigate("/product-form");
  };

  const handleEditButtonClick = (id) => {
    navigate(`/product-edit-form/${id}`);
  };

  useEffect(() => {
    dispatch(
      fetchProductsByFilterAndPage({
        filter,
        page,
        limit: ITEMS_PER_PAGE,
      })
    );
  }, [dispatch, page]);

  const handelFilter = (e, option, section) => {
    const newFilter = { ...filter };
    // If the filter section doesn't exist, create it
    if (!newFilter[section.id]) {
      newFilter[section.id] = [];
    }
    if (e.target.checked) {
      // Add the selected option to the filter
      newFilter[section.id].push(option.value);
    } else {
      // Remove the deselected option from the filter
      const index = newFilter[section.id].indexOf(option.value);
      if (index !== -1) {
        newFilter[section.id].splice(index, 1);
      }
      setFilter(newFilter);
    }
    // Dispatch the fetchProductsByFilter action with the updated filter
    dispatch(fetchProductsByFilterAndPage({ filter: newFilter }));
    // Update the component's state with the new filter
    setFilter(newFilter);
  };

  const handleSort = (sortOption) => {
    dispatch(sortProducts(sortOption));
  };

  const handlePage = (newPage) => {
    dispatch(
      fetchProductsByFilterAndPage({
        filter,
        page: newPage,
        limit: ITEMS_PER_PAGE,
      })
    );
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrands());
  }, []);

  return (
    <div className="flex flex-col m-auto bg-white ">
      <button
        type="submit"
        className="p-4 m-8 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-br from-teal-400 via-green-400 to-lime-400  rounded-md shadow-sm text-sm font-medium text-white focus:ring-offset-gray-50 "
        onClick={handleButtonClick}
      >
        Add Products
      </button>
      <ProductList></ProductList>
    </div>
  );
}
