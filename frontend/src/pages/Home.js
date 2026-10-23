import React from 'react'
import CategoryList from '../componentes/CategoryList'
import BannerProduct from '../componentes/BannerProduct'
import HorizontalCardProduct from '../componentes/HorizontalCardProduct'
import VerticalCardProduct from '../componentes/VerticalCardProduct'
import './Home.css'

const Home = () => {
  return (
    <main className="home-page">
      <section className="home-category-section">
        <CategoryList />
      </section>

      <section className="home-banner-section">
        <BannerProduct />
      </section>

      <div className="home-products-container">
        <section className="home-product-section home-horizontal-section">
          <HorizontalCardProduct
            category={"airpodes"}
            heading={"Top's Airpodes"}
          />
        </section>

        <section className="home-product-section home-horizontal-section">
          <HorizontalCardProduct
            category={"watches"}
            heading={"Popular's Watches"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"mobiles"}
            heading={"Mobiles"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"Mouse"}
            heading={"Mouse"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"televisions"}
            heading={"Televisions"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"camera"}
            heading={"Camera & Photography"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"earphones"}
            heading={"Wired Earphones"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"speakers"}
            heading={"Bluetooth Speakers"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"refrigerator"}
            heading={"Refrigerator"}
          />
        </section>

        <section className="home-product-section">
          <VerticalCardProduct
            category={"trimmers"}
            heading={"Trimmers"}
          />
        </section>
      </div>
    </main>
  )
}

export default Home