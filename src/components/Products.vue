<template>
  <div class="q-pa-xl">
    <div class="q-pa-md text-center text-h2">
      Our Products
    </div>
    <div class="text-center text-grey text-body1">
      Company manufacturing various types of machines specifically for Copper/ Brass and Aluminum processing industries the various products are enlisted below
    </div>
    <div class="mtt-20 desktop-only " v-if="slider_products" style="width:100%;margin:20px auto;height:300px">
      <!-- Using the slider component -->
      <slider ref="slider" :options="options">
        <!-- slideritem wrapped package with the components you need -->
        <template slot-scope="coverflow">
          <slideritem v-for="(item,index) in slider_products" :index="index" :key="index" :style="item.style">
            <div class="flex w-100">
              <div class="text-h6 q-pa-md text-uppercase product-title shadow-24 w-75">{{item.name }}
                <q-btn class="mtt-10" round color="primary" icon="send" @click="openProduct(item.id)" />
              </div>
            </div>
          </slideritem>
        </template>
        <!-- Customizable loading -->
        <div slot="loading">
          <q-circular-progress class="flex justify-center q-ma-md" indeterminate size="90px" :thickness="0.2" color="primary" center-color="grey-8" track-color="transparent" />
        </div>
      </slider>
    </div>
    <div class="mtt-20 mobile-only" style="width:100%;margin:20px auto;height:400px">
      <!-- Using the slider component -->
      <slider ref="slider" :options="a2">
        <!-- slideritem wrapped package with the components you need -->
        <slideritem v-for="(item,index) in slider_products_mobile" :index="index" :key="index" :style="item.style">
          <div class="flex w-100">
            <div class="text-h6 q-pa-md text-uppercase product-title shadow-24 flex justify-center w-100">{{item.name }}
              <div class="w-100">
                <q-btn class="mtt-10" round color="primary" icon="send" @click="openProduct(item.id)" />
              </div>
            </div>
          </div>
        </slideritem>
        <!-- Customizable loading -->
        <div slot="loading">
          <q-circular-progress class="flex justify-center q-ma-md" indeterminate size="90px" :thickness="0.2" color="primary" center-color="grey-8" track-color="transparent" />
        </div>
      </slider>
    </div>
  </div>
</template>
<script>
import
{
  firebaseStorage
}
from 'boot/firebase'
import
{
  slider,
  slideritem
}

from 'vue-concise-slider'
export default
{
  components:
  {
    slider,
    slideritem
  },

  data()
  {
    return {

      products_data: [],
      slider_products: [],
      slider_products_mobile: [],
      options:
      {
        currentPage: 0,
        infinite: 1,
        loop: true,
        loopedSlides: 1,
        autoplay: 4000,
      },
      a2:
      {
        effect: 'fade',
        loop: true,
        loopedSlides: 1,
        autoplay: 4000,
      }
    }

  },
  created()
  {
    this.initProducts();
  },
  methods:
  {

    initProducts: function()
    {
      let x = firebaseStorage.collection('products').get()
        .then(querySnapshot =>
        {
          this.products_data = querySnapshot.docs.map(doc => doc.data());
          this.processProducts();
        })
        .catch(err =>
        {
          console.log('Error getting document', err);
        });
    },
    processProducts: function()
    {
      let products = this.products_data;
      console.log(products);
      let sliderProducts = [];
      let sliderProductsMobile = [];

      products.forEach(function(value, i)
      {
        sliderProducts[i] = {
          'id': value.id,
          'name': value.name,
          'style': 'display:flex;background-image:url(' + value.thumb_img + ');width:23.5%;margin-right:2%;',
        }

        sliderProductsMobile[i] = {
          'id': value.id,
          'name': value.name,
          'style': 'display:flex;background-image:url(' + value.thumb_img + ');width:100%;margin-right:2%;',
        }

      });

      this.slider_products = sliderProducts;
      this.slider_products_mobile = sliderProductsMobile;
    },
    openProduct: function(id)
    {
      this.$router.push(
      {
        name: 'OpenProduct',
        params:
        {
          id: id
        }
      })

    }
  }

};

</script>
