<script setup lang="ts">
import type { Block, EventRecord } from '@polkadot/types/interfaces'
import { format, formatDistance } from 'date-fns'

const props = defineProps<{
  block: Block
  record: EventRecord
}>()

const { record } = toRefs(props)

const { state: block } = useBlock(props.block.header.number)
const timestamp = useBlockTimestamp(block)
const { state: fee } = useNetworkFeeByEventRecord(block, computed(() => record.value.hash))
const formatFee = useFormatD9TokenAmount(computed(() => fee.value?.actualFee))
</script>

<template>
  <CoverWrapper>
    <SearchInput />

    <section class="block card-shadow">
      <h2 text-1.125rem text-black font-900>
        Transaction Details
      </h2>

      <dl class="details">
        <div>
          <dt>
            Hash:
          </dt>
          <dd>
            {{ record.hash }}
          </dd>
        </div>

        <div>
          <dt>
            Result:
          </dt>
          <dd class="text-#39C068" font-bold>
            SUCCESSFUL
          </dd>
        </div>

        <div>
          <dt>
            Status:
          </dt>
          <dd>
            <span class="text-#39C068" font-bold>
              CONFIRMED
            </span>
            <span ml-1rem hidden>
              Confirmed by over 200 blocks
            </span>
          </dd>
        </div>

        <div>
          <dt>
            Confirmed SRs:
          </dt>
          <dd>
            <!-- <span font-bold>
              19
            </span>
            <span ml-1rem>
              Smart Consensus
              Valkyrie lnvestments
            </span> -->
            -
          </dd>
        </div>

        <div>
          <dt>
            Block:
          </dt>
          <dd font-bold>
            {{ block?.header.number }}
          </dd>
        </div>

        <div>
          <dt>
            Time:
          </dt>
          <dd font-bold>
            <template v-if="timestamp">
              <span>
                {{ formatDistance(timestamp, new Date(), { addSuffix: true }) }}
              </span>
              |
              <span>
                {{ format(timestamp, "yyyy MM-dd HH:mm:ss(O)") }}
              </span>
            </template>
          </dd>
        </div>

        <div>
          <dt>
            Resources Consumed & Fee:
          </dt>
          <dd font-bold>
            {{ formatFee }} D9
          </dd>
        </div>
      </dl>
    </section>
  </CoverWrapper>
</template>

<style scoped lang="scss">
.block {
  margin-top: -15.25rem;
  transform: translateY(19rem);

  background-color: rgba(255, 255, 255, 0.4);
  @apply px-2.625rem py-2.375rem rounded-2xl backdrop-blur-sm;
}
</style>
