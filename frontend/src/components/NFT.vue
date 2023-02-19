<template>
  <div class="card">
    <img :src="token.image_url" class="card-image" />
    <div class="category">{{ token.name }}</div>
    <div class="heading">Token Address:</div>
    <div class="heading">{{ reduceWallet(token.token_address) }}</div>
    <div class="heading mt-1">Token ID:</div>
    <div class="heading">{{ token.token_id }}</div>
  </div>
</template>

<script>
export default {
  name: "NFT",
  props: {
    token: Object,
  },
  data() {
    return {
      data: {
        name: "test",
        img: "",
        date: "",
        address: "",
      },
    };
  },
  methods: {
    reduceWallet(wallet) {
      return wallet.substr(-42, 10) + '...' + wallet.substr(-4, 4);
    },
  }
};
</script>

<style scoped lang="scss">
.card {
  max-width: 190px;
  height: 274px;
  background: none;
  border: none !important;
  margin: 25px;
  @media all and (max-width: 750px) {
    max-width: 140px;
  }

}
.card-image {
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
  @media all and (max-width: 750px) {
    width: 140px;
    height: 140px;
  }
}

.card-image:hover {
  transform: scale(0.98);
}

.category {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  /* or 8px */
  text-align: left;
  color: $black;
}

.category:hover {
  cursor: pointer;
}

.heading {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  color: #656565;
  /* or 8px */
}

.heading:hover {
  cursor: pointer;
}

.author {
  color: gray;
  font-weight: 400;
  font-size: 11px;
  padding-top: 20px;
}

.name {
  font-weight: 600;
}

.name:hover {
  cursor: pointer;
}
</style>
