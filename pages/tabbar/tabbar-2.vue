<template>
	<view>
		<view v-if="pageLoad">

			<view v-if=" !pageData " style="padding: 10px;">
				<view class="flex pd-10">
					您的购物车是空的,赶紧
					<text style="color: #f60;">去购买</text>吧
				</view>
			</view>
			<view v-else class="mgt-10">
				<view class="cartlist">

					<view v-for="($c,index) in pageData" :key="index" class="cartlist-item js-cart-item">

						<image class="cartlist-item-img" :src="$c.imgurl+'.100x100.jpg'" width="50" height="50"></image>

						<view class="flex-1">

							<view class="f16 pdb-5"> {{$c.name}}</view>
							<view class="flex-1"></view>
							<view class="flex">
								<view class="f14 corb" v-if="$c.name !=''">{{$c.name}}</view>
								￥
								<text class="f18 cor-money"> {{$c.price}} </text>元/斤
							</view>
							<view class="pd-5 flex">
								<view class="numbox">
									<view href="javascript:;" class="numbox-minus" @click="minusCart(index,$c.amount)">-</view>
									<input class=" numbox-num" :value="$c.amount" readonly />
									<view href="javascript:;" class="numbox-plus" @click="plusCart(index,$c.amount)">+</view>
								</view>
								<view class="flex-1"></view>
								<view class="fr f14 cor-danger" @click="deleteCart($c._id,index)">删除</view>
							</view>

						</view>
					</view>

				</view>
				<view class="cartlist-total pd-10 flex">
					<view class="flex-1"></view>
					<view class="cartlist-total-item"> 总价：￥
						<text class="num">{{total}}</text>元
					</view>
				</view>
				<view class="cartlist-btns">
					<navigator url="/pages/order/confirm">
						<view class="cartlist-btn">确认购买</view>
					</navigator>
				</view>
				<view class="clearfix"></view>

			</view>

		</view>

	</view>
</template>

<script>
	var app = require("../../common/common.js");
	var id;
	export default {
		components: {},
		data: function() {
			return {
				pageLoad: false,
				pageHide: false,
				pageData: {},
				total: 0
			}

		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: "购物车",
			})
			this.getPage();
		},
		onShow: function() {
			if (this.pageHide) {
				this.getPage();
			}
		},
		onHide: function() {
			this.pageHide = true;
		},
		methods: {
			getPage: function() {
				wx.cloud.init()
				const db = wx.cloud.database()
				db.collection('shopcar').get({
					success: res => {
						console.log(res);
						this.total = 0
						this.pageData = res.data
						this.pageData.forEach(item => {
							this.total += item.total * 1
						})
						this.pageLoad = true;
						// this.pageLoad = true;表示数据完成可以渲染
					},
					fail: err => {
						wx.showToast({
							icon: 'none',
							title: '查询记录失败'
						})
						console.error('[数据库] [查询记录] 失败：', err)
					}
				})
				this.pageLoad = true
			},
			plusCart: function(index, amount) {
				this.pageData[index].amount++
				this.pageData[index].total = this.pageData[index].amount * 1 * this.pageData[index].price
				this.total = 0
				this.pageData.forEach(item => {
					this.total += item.total
				})
			},
			minusCart: function(index, amount) {
				if (amount > 1) {
					this.pageData[index].amount--
					this.pageData[index].total = this.pageData[index].amount * 1 * this.pageData[index].price
					this.total = 0
					this.pageData.forEach(item => {
						this.total += item.total
					})
				}

			},
			deleteCart: function(id,index) {
				wx.cloud.init()
				const db = wx.cloud.database()
				db.collection('shopcar').doc(id).remove().then(res=>{
					this.pageData.splice(index, 1)
					console.log(this.pageData,11111111)
				})

			}
		},
	}
</script>

<style>
	@import "../../common/cart.css";
</style>
