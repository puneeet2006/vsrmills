<template>
  <div>
    <div v-if="pageLoader == true" class="fixed-center">
      <q-spinner-gears color="primary" size="6em" />
      <q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
    </div>
    <div v-if="pageLoader == false">
      <q-page padding>
        <div class="text-h2 text-center">Production Videos</div>
        <div class="row mtt-20">
          <div class="col-md-5 col-sm-5 col-xs-12 q-pa-lg" style="margin:0 auto;" v-for="(item,index) in listofvideos" :key="index">
            <q-card bordered dark class="shadow-20 flex" style="width: 100%;height:100%">
              <q-card-section>
                <div class="text-h6 text-uppercase">{{ item.name }}</div>
              </q-card-section>
              <iframe class="w-100" height="350" :src="item.link">
              </iframe>
            </q-card>
          </div>
        </div>
      </q-page>
    </div>
  </div>
</template>
<script>
import
{
  firebaseStorage
}
from 'boot/firebase'
export default
{
  data()
  {
    return {
      listofvideos: [],
      pageLoader: true,
    }
  },
  mounted()
  {
    this.initVideo();
  },
  methods:
  {
    initVideo: function()
    {
      this.pageLoader = true;
      let listofvideos = firebaseStorage.collection('videos').get()
        .then(querySnapshot =>
        {
          let videoData = querySnapshot.docs.map(doc => doc.data())
          this.listofvideos = videoData;
          this.pageLoader = false;
        })
        .catch(err =>
        {
          console.log('Error getting document', err);
          this.pageLoader = false;
        });
    },
  }
}

</script>
