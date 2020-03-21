<template>
	<div>
		<div v-if="pageLoad">
			<image :src="pageData.imgurl" mode="widthFix" class="d-img"></image>
			<div class="row-box mgb-5">
				<div class="d-title bd-mp-10">{{pageData.name}}</div>
				<div class="flex flex-ai-center bd-mp-10">
					价格 <div class="flex-1 cl-money f22 mgl-5" id="price">￥{{pageData.price*1*cart_amount}}</div>
					<div class="numbox">
						<div @click="dMinus" class="numbox-minus">-</div>
						<input class="numbox-num" id="cart-amount" v-model="cart_amount" readonly="" />
						<div @click="dPlus" class="numbox-plus">+</div>
					</div>
				</div>
			</div>
			<div class="pd-10 bg-fff">
				<div class="d-content">
					<rich-text :value="pageData.content"></rich-text>
				</div>
			</div>

			<div class="h60"></div>
			<div class="flcart">
				<navigator open-type="switchTab" url="/pages/tabbar/tabbar-1" class="flcart-f1">
					<div class="flcart-icon iconfont icon-home"></div>
					首页
				</navigator>
				<navigator open-type="switchTab" url="/pages/tabbar/tabbar-2" class="flcart-f1">
					<div class="flcart-icon iconfont icon-cart"></div>
					购物车
				</navigator>
				<div class="flcart-f2" @click="addCart">加入购物车</div>
				<div @click="goBuy" class="flcart-f2 bg-f30">立即购买</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				pageData: {},
				pageLoad: false,
				price: 0,
				cart_amount: 0,
				id:''
			}
		},
		onLoad: function(ops) {
			this.getPage(ops.id);
			console.log(ops.id)
			this.id = ops.id
		},
		methods: {
			getPage: function(id) {
				wx.cloud.init()
				const db = wx.cloud.database()
				db.collection('goods').where({
					'_id':id
				}).get({
					success: res => {
						console.log(res);
						this.pageData = res.data[0]
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
			},
			dMinus: function() {
				if (this.cart_amount > 1) {
					this.cart_amount--;
				}
			},
			dPlus: function() {
				this.cart_amount++;
			},
			addCart: function() {
				wx.cloud.init()
				const db = wx.cloud.database()
				let form = {
					imgurl:this.pageData.imgurl,
					price:this.pageData.price,
					name:this.pageData.name,
				}
				form.amount = this.cart_amount
				form.total = this.pageData.price*1*this.cart_amount
				form._id = this.id
				console.log(form)
				db.collection('shopcar').add({
					data: form,
					success: function(res) {
						console.log(res)
					}
				})
			},
			goBuy: function() {
				
			}
		}
	}
</script>

<style>
	.flcart {
		display: flex;
		flex-direction: row;
		position: fixed;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		font-size: 14px;
		line-height: 1.2;
		border-top: 1upx solid #eee;
		background-color: #fff;
		text-align: center;
	}

	.flcart-icon:before {
		padding-top: 10upx;
		clear: both;
		display: block;
		font-size: 14px;
		line-height: 1.2;
	}

	.flcart-f1,
	.flcart-f2 {
		height: 100upx;
	}

	.flcart-f1 {
		width: 132upx;
		display: inline-block;

		line-height: 50upx;
		font-size: 14px;
	}

	.flcart-f2 {
		flex: 1;
		line-height: 100upx;
		background-color: #f90;
		color: #fff;
		font-size: 14px;
	}

	.flcart .f3 {
		background-color: #f30;
	}

	.fcart .fbtn {}
</style>
