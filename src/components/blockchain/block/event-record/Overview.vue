<script setup lang="ts">
import type { EventRecord } from '@polkadot/types/interfaces'
import { truncateAddress } from '~/utils'

const props = defineProps<{
  record: EventRecord
}>()

const info = computed(() => {
  const event = props.record.event
  if (api.value?.events.balances.Transfer.is(event)) {
    const [from, to, amount] = event.data
    return { from, to, amount }
  }
  return {}
})

const formatAmount = useFormatD9TokenAmount(computed(() => info.value.amount))
</script>

<template>
  <section class="block card-shadow">
    <h2 text-1.125rem text-black font-900>
      Overview
    </h2>

    <dl class="details">
      <div class="!hidden">
        <dt font-bold>
          Owner Address:
        </dt>
        <dd font-bold text-gradient>
          T6yHGd7pRNUGCgiibnY7yjCgYww996fZv
        </dd>
      </div>

      <div class="!hidden">
        <dt>
          Contract Address:
        </dt>
        <dd>
          <Tag value="SC" bg="#B3B3B6" inline-block class="translate-y--.6" p-0 px-1 />
          <span>
            TNTNgtrpOTDCCwB9Dh17GNc22WzYbF7n
          </span>

          <span ml-1rem>
            D9 Token
          </span>
        </dd>
      </div>

      <div>
        <dt>
          <span mr-2>Token Transfer:</span>
          <Tag value="1" bg="#B3B3B6" class="translate-y--.6" inline-block p-0 px-2 />
        </dt>
        <dd>
          <span>
            From
          </span>
          <span mr-8 font-bold>
            {{ truncateAddress(info.from) }}
          </span>

          <span>
            to
          </span>
          <span mr-6 font-bold>
            {{ truncateAddress(info.to) }}
          </span>

          <span font-bold text-gradient>
            <span mr-1>
              {{ formatAmount }}
            </span>
            <span>
              D9
            </span>
          </span>
        </dd>
      </div>

      <div class="!hidden">
        <dt>
          Method Calling:
        </dt>
        <dd col>
          <div>
            <p>
              transfer(address recipient, unit256 amount)
            </p>
            <DataTable class="unstyled" :value="[{ name: 'reciplent', type: 'address', data: 'abccawefawef' }]">
              <Column header="#">
                <template #body="{ index }">
                  {{ index + 1 }}
                </template>
              </Column>
              <Column field="name" header="Name" />
              <Column field="type" header="Type" />
              <Column field="data" header="Data" />
            </DataTable>
          </div>
        </dd>
      </div>
      <!-- more block here -->
    </dl>
  </section>
</template>

<style scoped lang="scss">
.block {
  background-color: rgba(255, 255, 255, 0.4);
  @apply px-2.625rem py-2.375rem rounded-2xl backdrop-blur-sm;
}
dl {
  & > div {
    & > dd {
      :deep(.p-datatable) {
        margin-left: -16px;
        .p-datatable-thead > tr > th {
          background: transparent;
          padding-top: 0.4rem;
          padding-bottom: 0.4rem;
        }

        .p-datatable-tbody > tr {
          background: transparent;
          & > td {
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
          }
        }
      }
    }
  }
}
</style>
