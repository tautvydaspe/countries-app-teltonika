<template>

    <div class="paging-wrap">
          <button class="paging-nav" @click="onPaging(1)">&lt;&lt;</button>
          <button class="paging-nav" @click="onPaging(countries.meta.current_page-1)">&lt;</button>
          <button class="paging-nav" @click="onPaging(countries.meta.current_page+1)">&gt;</button>
          <button class="paging-nav" @click="onPaging(countries.meta.last_page)">&gt;&gt;</button>
        </div>
</template>

<script>
export default {
    name: 'PagingNav',
    props:['countries'],
    methods:{

         onPaging(page){
              this.$emit('paged',page);
         }

    }
}
</script>