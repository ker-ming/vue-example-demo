
<template>
  <div class="myCloundValley">
    <div v-if="cloudValleyId == 1 && repertoryFlag == 1" class="myCloundValley-1">
      <h1>我的库存</h1>
      <el-table
        :data="repertoryList"
        style="width: 100%"
      >
        <el-table-column
          :key="Math.random()"
          label="产品图片"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.img_url" alt="">
          </template>
        </el-table-column>
        <el-table-column
          :key="Math.random()"
          prop="title"
          label="产品名称"
          align="center"
        />
        <el-table-column
          :key="Math.random()"
          prop="label"
          label="产品型号"
          align="center"
        />
        <el-table-column
          :key="Math.random()"
          prop="outNum"
          label="结余数量"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.outNum }}件</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="Math.random()"
          prop="relation"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <span @click="getMore(scope.row.id, 1)">查看更多</span>
            <span v-if="scope.row.outNum == 0" style="color: #FF181D;cursor:pointer" @click="delect(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="repertory_1_total_pages"
        :current-page="repertory_1_start_page+ 1"
        @current-change="pageChange($event,1)"
      />
    </div>
    <div v-if="cloudValleyId == 1 && repertoryFlag == 2" class="myCloundValley-2">
      <div class="myCloundValley-2-title">
        <h1>我的账户</h1>
        <el-button type="primary" @click="repertoryFlag = 1; repertory_2_start_page = 0">返回</el-button>
      </div>
      <div class="myCloundValley-2-content">
        <el-table
          :data="repertoryLog.list"
          style="width: 100%"
        >
          <el-table-column
            :key="Math.random()"
            label="产品图片"
            align="center"
          >
            <template slot-scope="scope">
              <img :src="repertoryLog.img_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="title"
            label="产品名称"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ repertoryLog.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="label"
            label="产品型号"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ repertoryLog.label }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="order_no"
            label="订单编号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="create_time"
            label="日期"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="label"
            label="出库"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.change_num < 0">{{ scope.row.change_num }}件</span>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="num"
            label="入库"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.change_num > 0">{{ scope.row.change_num }}件</span>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="relation"
            label="结余"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.num }}件</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="repertory_2_total_pages"
          :current-page="repertory_2_start_page+ 1"
          @current-change="pageChange($event,2)"
        />
      </div>
    </div>
    <div v-if="cloudValleyId == 2 && repertoryFlag == 1" class="myCloundValley-3">
      <div class="myCloundValley-3-title">
        <h1>申请出库</h1>
        <el-button type="primary" @click="cloundBack(1)">返回</el-button>
      </div>
      <div class="myCloundValley-3-content">
        <el-table
          ref="myCloundValleyTable"
          :data="repertoryList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            :key="Math.random()"
            type="selection"
            width="60"
          />
          <el-table-column
            :key="Math.random()"
            label="产品图片"
            align="center"
          >
            <template slot-scope="scope">
              <img :src="scope.row.img_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="title"
            label="产品名称"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="label"
            label="产品型号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="relation"
            label="结余数量"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.outNum }}件</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            label="出库数量"
            align="center"
          >
            <template slot-scope="scope">
              <i class="el-icon-remove" @click="removeNum(scope.row.num,scope.$index)" />
              <input v-model="scope.row.num" type="text">
              <i class="el-icon-circle-plus" @click="circleNum(scope.row.num, scope.row.outNum, scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="repertory_3_total_pages"
          :current-page="repertory_3_start_page+ 1"
          @current-change="pageChange($event,3)"
        />
        <div class="myCloundValley-3-bottom">
          <el-checkbox v-model="checkboxAll" @change="clickAll">全选</el-checkbox>
          <h2 />
          <span>已选{{ productNum }}个产品，共出库{{ productAll }}件</span>

          <el-button type="primary" @click="cloundApply(1)">确认</el-button>
        </div>
      </div>
    </div>
    <div v-if="cloudValleyId == 2 && repertoryFlag == 2" class="myCloundValley-4">
      <div class="myCloundValley-4-title">
        <div class="top">
          <h1>确认订单信息</h1>
          <el-button type="primary" @click="cloundBack(2)">返回</el-button>
        </div>
        <div class="bottom">
          <div class="bottom-1">
            <p>姓名：{{ defaultData.name }}</p>
            <p>电话：{{ defaultData.tel }}</p>
          </div>
          <div class="bottom-2">
            <p>所在地区：{{ defaultData.full_name }}</p>
            <p>详细地址：{{ defaultData.address }}</p>
          </div>
          <div class="bottom-3">
            <el-button type="primary" round size="mini" disabled>默认</el-button>
            <span @click="jumpAddress">编辑</span>
          </div>
        </div>
      </div>
      <div class="myCloundValley-4-content">
        <el-table
          :data="cloudVaalleyArr"
          style="width: 100%"
        >
          <el-table-column
            :key="Math.random()"
            label="产品图片"
            align="center"
          >
            <template slot-scope="scope">
              <img :src="scope.row.img_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="title"
            label="产品名称"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="label"
            label="产品型号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="relation"
            label="出库数量"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.num }}件</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="myCloundValley-4-bottom">
          <h2 />
          <span>运费:到付</span>
          <span>已选{{ productNum }}个产品，共出库{{ productAll }}件</span>
          <el-button type="primary" @click="cloundApply(2)">确认</el-button>
        </div>
      </div>
    </div>
    <div v-if="cloudValleyId == 3 && repertoryFlag == 1" class="myCloundValley-5">
      <div class="myCloundValley-5-title">
        <h1>订单入库</h1>
      </div>
      <div class="myCloundValley-5-content">
        <el-table
          :data="mainOrderList"
          style="width: 100%"
        >
          <el-table-column
            :key="Math.random()"
            prop="order_no"
            label="订单编号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="create_time"
            label="下单时间"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">未付款</span>
              <span v-if="scope.row.status == 1">待发货</span>
              <span v-if="scope.row.status == 2">未入库</span>
              <span v-if="scope.row.status == 3">已入库</span>
              <span v-if="scope.row.status == 8">取消交易</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <span style="cursor:pointer" @click="getMore(scope.row, 2)">查看清单</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="repertory_5_total_pages"
          :current-page="repertory_5_start_page+ 1"
          @current-change="pageChange($event,5)"
        />
      </div>
    </div>
    <div v-if="cloudValleyId == 3 && repertoryFlag == 2" class="myCloundValley-6">
      <div class="myCloundValley-6-title">
        <div class="top">
          <h1>订单入库产品清单</h1>
          <el-button type="primary" @click="cloundBack(2)">返回</el-button>
        </div>
        <div class="bottom">
          <span>订单编号：{{ rData.order_no }}</span>
          <span>下单日期：{{ rData.create_time }}</span>
        </div>
      </div>
      <div class="myCloundValley-6-content">
        <el-table
          style="width: 100%"
          :data="rData.MainOrders[0].orderSkus"
        >
          <el-table-column
            :key="Math.random()"
            label="产品图片"
            align="center"
          >
            <template slot-scope="scope">
              <img :src="scope.row.img_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="spu_name"
            label="产品名称"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="value_names"
            label="产品型号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="num"
            label="出库数量"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.num }}件</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            label="状态"
            align="center"
            prop="status"
          />
        </el-table>
        <div class="myCloundValley-6-bottom">
          <h2 />
          <span @click="download(1)">下载</span>
          <span>入库订单信息</span>
          <el-button v-if="rData.status == 2" type="primary" @click="warehousing">确认入库</el-button>
        </div>
      </div>
    </div>
    <div v-if="cloudValleyId == 4 && repertoryFlag == 1" class="myCloundValley-7">
      <div class="myCloundValley-7-title">
        <h1>出库订单</h1>
      </div>
      <div class="myCloundValley-7-content">
        <el-table
          :data="orderList"
          style="width: 100%"
        >
          <el-table-column
            :key="Math.random()"
            prop="order_no"
            label="订单编号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="create_time"
            label="下单时间"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">待发货</span>
              <span v-if="scope.row.status == 2">待收货</span>
              <span v-if="scope.row.status == 3">已收货</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <span style="cursor:pointer" @click="getMore(scope.row.id, 3)">查看清单</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="repertory_7_total_pages"
          :current-page="repertory_7_start_page+ 1"
          @current-change="pageChange($event,5)"
        />
      </div>
    </div>
    <div v-if="cloudValleyId == 4 && repertoryFlag == 2" class="myCloundValley-8">
      <div class="myCloundValley-8-title">
        <div class="top">
          <h1>出库信息</h1>
          <el-button type="primary" @click="cloundBack(2)">返回</el-button>
        </div>
        <div class="bottom">
          <div class="bottom-1">
            <p>姓名：{{ mainOrderDetail.to_name }}</p>
            <p>电话：{{ mainOrderDetail.to_tel }}</p>
          </div>
          <div class="bottom-2">
            <p>所在地区：{{ mainOrderDetail.address[0] || '' }}</p>
            <p>详细地址：{{ mainOrderDetail.address[1] || '' }}</p>
          </div>
          <div class="bottom-3">
            <p>订单编号：{{ mainOrderDetail.order_no }}</p>
            <p>下单日期：{{ mainOrderDetail.create_time }}</p>
          </div>
        </div>
      </div>
      <div class="myCloundValley-8-content">
        <el-table
          style="width: 100%"
          :data="mainOrderDetail.crOrderSkus"
        >
          <el-table-column
            :key="Math.random()"
            label="产品图片"
            align="center"
          >
            <template slot-scope="scope">
              <img :src="scope.row.img_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            prop="title"
            label="产品名称"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="label"
            label="产品型号"
            align="center"
          />
          <el-table-column
            :key="Math.random()"
            prop="num"
            label="出库数量"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.num }}件</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            label="状态"
            align="center"
            prop="status"
          />
        </el-table>
        <div class="myCloundValley-8-bottom">
          <span @click="download(2)">下载</span>
          <span>出库订单信息</span>
          <h2 />
          <span>已选{{ mainOrderDetail.product_count }}个产品，共出库{{ mainOrderDetail.total_num }}件</span>
          <el-button type="primary" @click="warehousing">确认收货</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
    >
      <div class="dialog-content">
        <img src="@/assets/yImg/require.png" alt="">
        <p>产品出库申请提交成功</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { validPhone } from '@/utils/validate'

export default {
  name: 'MyCloundValley',
  props: {
    cloudValleyId: {
      type: Number,
      default: 1
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      repertoryList: [],
      repertory_1_start_page: 0,
      repertory_1_total_pages: 0,

      repertoryLog: {},
      repertory_2_start_page: 0,
      repertory_2_total_pages: 0,

      repertory_3_start_page: 0,
      repertory_3_total_pages: 0,

      orderList: [],
      repertory_5_start_page: 0,
      repertory_5_total_pages: 0,

      repertory_7_start_page: 0,
      repertory_7_total_pages: 0,

      mainOrderDetail: {},
      repertoryLogId: 0,
      repertoryFlag: 1,
      cloudVaalleyArr: [],
      checkboxAll: false,
      productNum: 0,
      productAll: 0,
      defaultData: {},
      dialogVisible: false,
      mainOrderList: [],
      orderDetailId: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  watch: {
    'cloudValleyId': function(newId) {
      if (newId == 2) {
        this.getRepertoryList(2)
      }
      this.repertoryFlag = 1
    }
  },
  created() {
    this.getRepertoryList(1)
    this.getOrderList()
    // this.defaultView()
    this.getMainOrderList()
  },
  methods: {
    download(index) {
      if (index === 1) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['产品名称', '产品型号', '出库数量', '状态'] // excel 表头
          const filterVal = ['spu_name', 'value_names', 'num', 'status'] // 获取的数据字段名
          const list = this.rData.MainOrders[0].orderSkus // 所要生成Excel数据源
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '订单列表'
          })
        })
      } else if (index === 2) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['产品名称', '产品型号', '出库数量', '状态'] // excel 表头
          const filterVal = ['title', 'label', 'num', 'status'] // 获取的数据字段名
          const list = this.mainOrderDetail.crOrderSkus // 所要生成Excel数据源
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '订单列表'
          })
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 删除
    delect(id) {
      const self = this
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/cloudRepertory/repertory-api/del-repertory',
          method: 'post',
          data: {
            token: self.token,
            rid: id
          }
        }).then(res => {
          this.getRepertoryList(1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑地址
    jumpAddress() {
      this.$emit('partnersJump', 2)
    },
    // 默认地址
    defaultView() {
      const self = this
      request({
        url: '/shop/me-address-api/default-view',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.defaultData = res.data
        this.defaultData.full_name = res.data.full_name.split(' ')[0]
      })
    },
    // 确认入库
    warehousing() {
      const self = this
      request({
        url: '/order/order-api/confirm',
        method: 'post',
        data: {
          token: self.token,
          order_id: self.rData.order_id
        }
      }).then(res => {
        this.$message({
          message: '入库成功',
          type: 'success',
          showClose: true
        })
        this.repertoryFlag = 1
        this.getMainOrderList()
      })
    },
    // 确认申请出库
    cloundApply(index) {
      if (index === 1) {
        if (this.cloudVaalleyArr.length == 0) {
          this.$message({
            message: '请选择出库的商品',
            showClose: true,
            type: 'warning'
          })
          return
        }
        this.repertoryFlag = 2
        this.defaultView()
      } else if (index === 2) {
        const self = this
        request({
          url: '/cloudRepertory/repertory-api/apply',
          method: 'post',
          data: {
            token: self.token,
            item_data: self.cloudVaalleyArr,
            address_id: self.defaultData.maid
          }
        }).then(res => {
          // this.$message({
          //   message: '申请出库成功',
          //   type: 'success'
          // })
          this.dialogVisible = true
        })
      }
    },
    // 全选
    clickAll() {
      this.$refs.myCloundValleyTable.toggleAllSelection()
    },
    // 表格选择
    handleSelectionChange(val) {
      let All = 0
      val = val.map(item => {
        return {
          ...item,
          rid: item.id
        }
      })
      this.cloudVaalleyArr = val
      this.productNum = val.length
      val.map(item => {
        if (item) {
          All += item.num
        }
      })

      this.productAll = All
    },
    // 减
    removeNum(num, index) {
      if (num > 1) {
        this.repertoryList[index].num--
      }
      this.$refs.myCloundValleyTable.toggleRowSelection()
      this.$refs.myCloundValleyTable.toggleRowSelection()
    },
    // 加
    circleNum(num, outNum, index) {
      if (num < outNum) this.repertoryList[index].num++
      this.$refs.myCloundValleyTable.toggleRowSelection()
      this.$refs.myCloundValleyTable.toggleRowSelection()
    },
    handleChange() {

    },
    // 返回
    cloundBack(index) {
      if (index === 1) {
        this.$emit('partnersJump', 1)
        this.repertoryFlag = 1
        this.repertory_1_start_page = 0
        this.getRepertoryList(1)
      } else if (index === 2) {
        this.repertoryFlag = 1
      }
    },
    pageChange(data, index) {
      if (index === 1) {
        this.repertory_1_start_page = data - 1
        this.getRepertoryList(1)
      } else if (index === 2) {
        this.repertory_2_start_page = data - 1
        this.getRepertoryLog()
      } else if (index === 3) {
        this.repertory_3_start_page = data - 1
        this.getRepertoryList(2)
      } else if (index === 5) {
        this.repertory_5_start_page = data - 1
        this.getMainOrderList()
      } else if (index === 7) {
        this.repertory_7_start_page = data - 1
        this.getMainOrderList()
      }
    },
    // 库存列表
    getRepertoryList(index) {
      let start_page = ''
      if (index === 1) {
        start_page = this.repertory_1_start_page
      } else if (index === 2) {
        start_page = this.repertory_3_start_page
      }
      const self = this
      request({
        url: '/cloudRepertory/repertory-api/my-repertory',
        method: 'post',
        data: {
          token: self.token,
          start_page,
          pages: 10
        }
      }).then(res => {
        this.repertoryList = res.data.list.map(item => {
          return {
            ...item,
            outNum: item.num,
            num: 1
          }
        })
        this.repertory_1_total_pages = res.data.total_pages - 0
        this.repertory_3_total_pages = res.data.total_pages - 0
      })
    },
    // 查看明细
    getMore(id, index) {
      if (index === 1) {
        this.repertoryLogId = id
        this.repertory_2_start_page = 0
        this.getRepertoryLog()
        this.repertoryFlag = 2
      } else if (index === 2) {
        this.repertoryFlag = 2
        this.rData = id
        this.rData.MainOrders[0].orderSkus = id.MainOrders[0].orderSkus.map(item => {
          let status = ''
          if (item.status == 0) {
            status = '未付款'
          } else if (item.status == 1) {
            status = '待发货'
          } else if (item.status == 2) {
            status = '未入库'
          } else if (item.status == 3) {
            status = '已入库'
          } else if (item.status == 8) {
            status = '取消交易'
          }
          return {
            ...item,
            status
          }
        })
      } else if (index === 3) {
        this.repertoryFlag = 2
        this.orderDetailId = id
        this.getMainOrderDetail()
      }
    },
    // 明细列表
    getRepertoryLog() {
      const self = this
      request({
        url: '/cloudRepertory/repertory-api/repertory-log',
        method: 'post',
        data: {
          token: self.token,
          rid: self.repertoryLogId,
          start_page: self.repertory_2_start_page,
          pages: 10
        }
      }).then(res => {
        this.repertoryLog = res.data
        this.repertory_2_total_pages = res.data.total_pages - 0
      })
    },
    // 订单列表列表
    getOrderList() {
      const self = this
      request({
        url: '/cloudRepertory/repertory-api/order-list',
        method: 'post',
        data: {
          token: self.token,
          start_page: self.repertory_5_start_page,
          pages: 10
        }
      }).then(res => {
        this.orderList = res.data.list
        this.repertory_5_total_pages = res.data.total_pages - 0
      })
    },
    // 云仓订单列表
    getMainOrderList() {
      const self = this
      request({
        url: '/order/order-api/main-order-list',
        method: 'post',
        data: {
          token: self.token,
          start_page: self.repertory_7_start_page,
          pages: 10,
          is_cloud_repy: 1
        }
      }).then(res => {
        this.mainOrderList = res.data.list
        this.repertory_7_total_pages = res.data.total_pages - 0
      })
    },
    // 云仓订单详情
    getMainOrderDetail() {
      const self = this
      request({
        url: '/cloudRepertory/repertory-api/order-detail',
        method: 'post',
        data: {
          token: self.token,
          order_id: self.orderDetailId
        }
      }).then(res => {
        this.mainOrderDetail = res.data
        if (res.data.to_address) {
          this.mainOrderDetail.address = [res.data.to_address.split(' ')[0], res.data.to_address.split(' ')[1]]
        }
        let status = ''
        if (res.data.status == 1) {
          status = '待发货'
        } else if (res.data.status == 2) {
          status = '待收货'
        } else if (res.data.status == 3) {
          status = '已收货'
        }
        this.mainOrderDetail.crOrderSkus = res.data.crOrderSkus.map(item => {
          return {
            ...item,
            status
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" >
  .myCloundValley{
    thead{
      tr{
        th:nth-child(1){
          .el-checkbox{
            display: none
          }
        }
      }
    }
    &-1{
      min-height: 940px;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      overflow: hidden;
      h1{
        font-size: 32px;
        font-weight: 400;
        line-height: 105px;
        border-bottom: 1px solid #ddd;
        padding-left: 50px;
        margin: 0;
        color: #0C2543;
      }
    }
    &-2{
      &-title{
        display: flex;
        align-items: center;
        padding: 0 50px;
        height: 105px;
        justify-content: space-between;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        h1{
            font-size: 32px;
            font-weight: 400;
            margin-right: 30px;
        }
        .el-button{
            margin-left: 40px;
        }
      }
      &-content{
        height: 805px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      }
    }
    &-3{
      &-title{
        display: flex;
        align-items: center;
        padding: 0 50px;
        height: 105px;
        justify-content: space-between;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        h1{
            font-size: 32px;
            font-weight: 400;
            margin-right: 30px;
        }
        .el-button{
            margin-left: 40px;
        }
      }
      &-content{
        height: 805px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        .el-table{
          min-height: 665px;
        }
      }
      &-bottom{
        width: 100%;
        height: 70px;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        font-size:14px;
        .el-checkbox{
          margin-left: 17px;
          .el-checkbox__inner{
            height: 16px;
            width: 16px;
          }

        }
        h2{
          flex: 1
        }
        >span{
          margin-right: 30px;
        }
        .el-button{
          height: 100%;
          width: 153px;
          border-radius: 0;
        }
      }
    }
    &-4{
      &-title{
        height: 218px;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        .top{
          height: 105px;
          border-bottom: 1px solid #ddd;
          display: flex;
          align-items: center;
          padding: 0 50px;
          justify-content: space-between;
          h1{
              font-size: 32px;
              font-weight: 400;
              margin-right: 30px;
          }
          .el-button{
              margin-left: 40px;
          }
        }
        .bottom{
          padding: 0 50px;
          height: 113px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &-1{
            width: 190px;
            p{
              margin: 15px 0;
            }
          }
          &-2{
            flex: 1;
            p{
              margin: 15px 0;
            }
          }
          &-3{
            color: #FF181D;
            .el-button{
              margin-right: 20px;
            }
            span{
              cursor: pointer;
            }
          }
        }
      }
      &-content{
        height: 692px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        .el-table{
          min-height: 622px;
        }
      }
      &-bottom{
        width: 100%;
        height: 70px;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        font-size:14px;
        .el-checkbox{
          margin-left: 17px;
          .el-checkbox__inner{
            height: 16px;
            width: 16px;
          }

        }
        h2{
          flex: 1
        }
        >span{
          margin-right: 30px;
        }
        .el-button{
          height: 100%;
          width: 153px;
          border-radius: 0;
        }
      }
    }
    &-5{
      &-title{
        display: flex;
        align-items: center;
        padding: 0 50px;
        height: 105px;
        justify-content: space-between;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        h1{
            font-size: 32px;
            font-weight: 400;
            margin-right: 30px;
        }
        .el-button{
            margin-left: 40px;
        }
      }
      &-content{
        height: 805px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        .el-table{
          // min-height: 665px;
        }
      }
      &-bottom{
        width: 100%;
        height: 70px;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        font-size:14px;
        .el-checkbox{
          margin-left: 17px;
          .el-checkbox__inner{
            height: 16px;
            width: 16px;
          }

        }
        h2{
          flex: 1
        }
        >span{
          margin-right: 30px;
        }
        .el-button{
          height: 100%;
          width: 153px;
          border-radius: 0;
        }
      }
    }
    &-6{
      &-title{
        height: 218px;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        .top{
          height: 105px;
          border-bottom: 1px solid #ddd;
          display: flex;
          align-items: center;
          padding: 0 50px;
          justify-content: space-between;
          h1{
              font-size: 32px;
              font-weight: 400;
              margin-right: 30px;
          }
          .el-button{
              margin-left: 40px;
          }
        }
        .bottom{
          padding: 0 50px;
          height: 113px;
          display: flex;
          align-items: center;
          span{
            margin-right: 60px;
          }
        }
      }
      &-content{
        height: 692px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        .el-table{
          min-height: 622px;
        }
      }
      &-bottom{
        width: 100%;
        height: 70px;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        font-size:14px;
        .el-checkbox{
          margin-left: 17px;
          .el-checkbox__inner{
            height: 16px;
            width: 16px;
          }
        }
        h2{
          flex: 1
        }
        >span{
          &:nth-of-type(1){
            color: #FF181D;
            font-weight: 600
          }
          &:nth-of-type(2){
            margin-right: 60px
          }
        }
        .el-button{
          height: 100%;
          width: 153px;
          border-radius: 0;
        }
      }
    }
    &-7{
      &-title{
        display: flex;
        align-items: center;
        padding: 0 50px;
        height: 105px;
        justify-content: space-between;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        h1{
            font-size: 32px;
            font-weight: 400;
            margin-right: 30px;
        }
        .el-button{
            margin-left: 40px;
        }
      }
      &-content{
        height: 805px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        .el-table{
          // min-height: 665px;
        }
      }
      &-bottom{
        width: 100%;
        height: 70px;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        font-size:14px;
        .el-checkbox{
          margin-left: 17px;
          .el-checkbox__inner{
            height: 16px;
            width: 16px;
          }

        }
        h2{
          flex: 1
        }
        >span{
          margin-right: 30px;
        }
        .el-button{
          height: 100%;
          width: 153px;
          border-radius: 0;
        }
      }
    }
    &-8{
      &-title{
        height: 218px;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        overflow: hidden;
        .top{
          height: 105px;
          border-bottom: 1px solid #ddd;
          display: flex;
          align-items: center;
          padding: 0 50px;
          justify-content: space-between;
          h1{
              font-size: 32px;
              font-weight: 400;
              margin-right: 30px;
          }
          .el-button{
              margin-left: 40px;
          }
        }
        .bottom{
          padding: 0 50px;
          height: 113px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          &-1{
            flex: 1;
            p{
              margin: 15px 0;
            }
          }
          &-2{
            flex: 1;
            p{
              margin: 15px 0;
            }
          }
          &-3{
            flex: 1;
            p{
              margin: 15px 0;
            }
          }
        }
      }
      &-content{
        height: 692px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        .el-table{
          // min-height: 622px;
        }
      }
      &-bottom{
        width: 100%;
        height: 70px;
        background: #F4F4F4;
        display: flex;
        align-items: center;
        font-size:14px;
        .el-checkbox{
          margin-left: 17px;
          .el-checkbox__inner{
            height: 16px;
            width: 16px;
          }
        }
        h2{
          flex: 1
        }
        >span{
          &:nth-of-type(1){
            color: #FF181D;
            font-weight: 600;
            margin: 0 5px 0 50px;
          }
          &:nth-of-type(2){
            margin-right: 60px
          }
        }
        .el-button{
          height: 100%;
          width: 153px;
          border-radius: 0;
          margin-left: 20px
        }
      }
    }
    .el-table{
      thead{
        tr{
          height: 62px;
          th{
            color: #000;
            font-size: 16px;
            font-weight: 600
          }
        }
      }
      tbody{
        tr{
          td{
            -moz-user-select:none; /*火狐*/
            -webkit-user-select:none; /*webkit浏览器*/
            -ms-user-select:none; /*IE10*/
            -khtml-user-select:none; /*早期浏览器*/
            user-select:none;
            .cell{
              overflow: inherit;
            }
            img{
              width: 62px;
              height: 63px;
            }
            i{
              font-size: 18px;
              color: #FF181D;
              cursor: pointer;
              margin: 0 5px;
            }
            input{
              width: 32px;
              height: 24px;
              text-align: center;

            }
            &:nth-child(6){
              // color:#FF181D
            }
          }
        }
      }
    }
    .el-dialog{
      .dialog-content{
        width: 100%;
        height: 300px;
        text-align: center;
        img{
          width: 60px;
          height: 60px;
          margin: 60px;
        }
        p{
          font-weight: 600
        }
      }
    }
  }
</style>
