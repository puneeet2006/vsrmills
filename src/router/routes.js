const routes = [
{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    name: 'Index',
    path: '',
    component: () => import('pages/Index.vue')
  }]
},
{
  path: '/product/:id',

  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    path: '',
    name: 'OpenProduct',
    component: () => import('pages/OpenProduct.vue')
  }]
},
{
  path: '/about',

  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    path: '',
    name: 'about',
    component: () => import('pages/About.vue')
  }]
},
{
  path: '/contact',

  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    path: '',
    name: 'contact',
    component: () => import('pages/Contact.vue')
  }]
},
{
  path: '/videolibrary',

  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    path: '',
    name: 'videolibrary',
    component: () => import('pages/VideoLibrary.vue')
  }]
},
{
  path: '/products',

  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    path: '',
    name: 'products',
    component: () => import('pages/Products.vue')
  }]
},
{
  path: '/subproduct/:id',

  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    path: '',
    name: 'OpenSubProduct',
    component: () => import('pages/OpenSubProduct.vue')
  }]
},
{
  path: '/admin',
  component: () => import('layouts/MyLayout.vue'),
  children: [
  {
    name: 'AdminLogin',
    path: '',
    component: () => import('pages/Login.vue')
  }]
},
{
  path: '/admin/dashboard',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'Dashboard',
    component: () => import('pages/Dashboard.vue')
  }]
},
{
  path: '/admin/video',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AdminVideo',
    component: () => import('components/Admin/AddVideoToLibrary.vue')
  }]
},
{
  path: '/admin/carosuel',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AdminCarosuel',
    component: () => import('components/Admin/Carosuel.vue')
  }]
},
{
  path: '/admin/products',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AdminProducts',
    component: () => import('components/Admin/ProductsMain.vue')
  }]
},
{
  path: '/admin/about',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AdminProducts',
    component: () => import('components/Admin/EditAbout.vue')
  }]
},
{
  path: 'admin/editproduct/:id',

  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AdminEditProduct',
    component: () => import('components/Admin/EditProductMain.vue')
  }]
},
{
  path: '/admin/enquiry',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AdminEnquiry',
    component: () => import('components/Admin/EnquiryMain.vue')
  }]
},
{
  path: '/admin/addproduct',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'AddProduct',
    component: () => import('components/Admin/AddProduct.vue')
  }]
},
{
  path: '/admin/productparts',
  component: () => import('layouts/AdminAuth.vue'),
  children: [
  {
    path: '',
    name: 'ProductParts',
    component: () => import('components/Admin/ProductParts.vue')
  }]
}, ]

// Always leave this as last one
if (process.env.MODE !== 'ssr')
{
  routes.push(
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
