<script setup lang="ts">

</script>

<template>
  <div rounded-xl px-2.25rem py-1.625rem card-shadow>
    <h2 mb-4 text-1.125rem font-bold>
      More
    </h2>

    <dl class="details">
      <div>
        <dd>
          Holders:
        </dd>
        <dt>
          232,960
        </dt>
      </div>

      <div>
        <dd>
          Total Transfer Count:
        </dd>
        <dt>
          1.859,321
        </dt>
      </div>

      <div>
        <dd>
          Transfers (24h):
        </dd>
        <dt>
          <span>1.051</span>
          <span>(-15.18%)</span>
        </dt>
      </div>

      <div>
        <dd>
          Trading Volume (24h):
        </dd>
        <dt>
          <span>$1.051</span>
          <span>(-15.18%)</span>
        </dt>
      </div>

      <div>
        <dd>
          Liquidity:
        </dd>
        <dt>
          <span>$1.051</span>
          <span>(-15.18%)</span>
        </dt>
      </div>
    </dl>
  </div>
</template>

<style scoped lang="scss">
dl {
  & > div {
    & > dt {
      span:last-child {
        color: rgb(223, 0, 0);
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
