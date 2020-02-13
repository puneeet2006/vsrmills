<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h5 text-center text-primary mbb-20 mtt-20">Add Video</div>
      <div class="row flex flex-center">
        <q-card class="q-pa-md shadow-20 card-top-border col-md-9 w-50">
          <form @submit.prevent.stop="saveVideo" class="q-gutter-md">
            <q-input v-model="name" label="Rolling Mills Name" :rules="[val => !!val || 'Field is required']" />
            <q-input v-model="link" label="Video Link" :rules="[val => !!val || 'Field is required']">
              <template v-slot:hint>
                Video Format : https://www.youtube.com/<b>embed</b>/IndPGuEI9wQ
              </template>
            </q-input>
            <div class="mtt-20 row flex justify-end">
              <q-btn size="md" color="primary" type="submit" icon="check" :loading="loading" label="Save" />
            </div>
          </form>
          <div class="mtt-20">
            <h5>List of Videos</h5>
            <q-list>
              <div v-for="item in listofvideos">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-uppercase text-primary fw-600">Name : {{ item.name}}</q-item-label>
                    <q-item-label lines="2">Mobile: {{ item.link }}</q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-btn color="negative" class="mtt-10" dense size="sm" icon="delete" @click="deleteVideo(item.id)" />
                  </q-item-section>
                </q-item>
                <q-separator spaced inset class="mtt-10 mbb-10" />
              </div>
            </q-list>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import
{
  firebaseStorage,
  firebaseImageStorage
}
from 'boot/firebase'
import
{
  Notify
}
from 'quasar'

const docID = 'videos';
export default
{

  data()
  {
    return {
      name: null,
      link: null,
      listofvideos: [],
      loading: false
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
      let listofvideos = firebaseStorage.collection(docID).get()
        .then(querySnapshot =>
        {
          let videoData = querySnapshot.docs.map(doc => doc.data())
          this.listofvideos = videoData;
        })
        .catch(err =>
        {
          console.log('Error getting document', err);
        });
    },
    deleteVideo: function(id)
    {
      var deleteQuery = firebaseStorage.collection(docID).doc(id).delete()
      this.initVideo();
    },
    saveVideo: function()
    {

      this.loading = true;
      let videoId = 'video' + Math.floor(Math.random() * 90000) + 10000;
      firebaseStorage.collection(docID).doc(videoId).set(
      {
        id: videoId,
        name: this.name.toUpperCase(),
        link: this.link,
      }).then(() =>
      {
        Notify.create(
        {
          message: 'Saved Successfully',
          color: 'green'
        });
        this.loading = false;
        this.initVideo();

      }).catch((error) =>
      {
        Notify.create(
        {
          message: 'Saving Error!',
          color: 'red'
        });
        this.loading = false;
      });

    },
  }

};

</script>
