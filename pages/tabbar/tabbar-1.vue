<template>
	<div>
		<div v-if="!pageLoad">
			<page-loading></page-loading>
		</div>
		<div v-else>
			<div class="pd-5">
				<div class="flex">
					<input v-model="keyword" type="search" class="header-search pdl-5">
					<div @click="search" class="header-search-btn  iconfont icon-search"></div>
				</div>
			</div>
			<!-- 		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,key) in pageData.flashList" :key="key">
				<view class="swiper-item">
					<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
				</view>
			</swiper-item>
		
		</swiper> -->
			<!-- <view class="m-navPic mgt-5 mgb-5">
			<navigator v-for="(item,key) in pageData.navList" :key="key"  :url="item.link1" class="m-navPic-item">
				<image class="m-navPic-img"  mode="widthFix" :src="item.imgurl"></image>
				<view class="m-navPic-title">{{item.title}}</view>
			</navigator>
		
		</view> -->
			<div class="row-box-hd  pdl-10">
				<div class="flex-1 f16">推荐菜品</div>
				<!-- <div class="row-box-more">更多</div> -->
			</div>
			<div class="mtlist">

				<div v-for="(item,index) in pageData" :key="index" @click="goProduct(item._id)" class="mtlist-item">
					<div class="mtlist-item-bd">
						<div class="mtlist-imgbox">
							<image mode="widthFix" class="mtlist-img " :src="item.imgurl"></image>
						</div>
						<div class="mtlist-item-pd">
							<div class="mtlist-item-money">
								<div class="mtlist-item-money-flex">￥
									<text class="mtlist-item-money_money">{{item.price}}</text>
								</div>
								<!-- <div class="mtlist-item-money_num">月销{{item.buy_num}}件</div> -->
							</div>
							<div class="mtlist-title">{{item.name}}</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	</div>

</template>

<script>
	// import b2cFooter from "../../components/b2cfooter.vue";
	export default {
		components: {
			// b2cFooter
		},
		data() {
			return {
				pageData: {},
				pageLoad: false,
				keyword: ""
			}
		},
		onLoad: function(ops) {
			uni.setNavigationBarTitle({
				title: "买菜宝"
			})
			// this.getPage();
			this.getPage()
		},
		methods: {
			search: function() {

			},
			goProduct: function(id) {
				console.log(id)
				uni.navigateTo({
					url:"../product/product?id="+id
				})
			},
			onAdd: function() {
				const db = wx.cloud.database()
				db.collection('goods').add({
					data: {
						count: 1
					},
					success: res => {
						// 在返回结果中会包含新创建的记录的 _id
						this.setData({
							counterId: res._id,
							count: 1
						})
						wx.showToast({
							title: '新增记录成功',
						})
						console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
					},
					fail: err => {
						wx.showToast({
							icon: 'none',
							title: '新增记录失败'
						})
						console.error('[数据库] [新增记录] 失败：', err)
					}
				})
			},
			getPage: function() {
				wx.cloud.init()
				const db = wx.cloud.database()
				db.collection('goods').get({
					success: res => {
						console.log(res);
						this.pageData = res.data
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
			test: function() {
				wx.cloud.init() //调用前需先调用init
				wx.cloud.callFunction({
					name: 'check',
					data: {
						"content": this.contents
					}
				}).then(res => {
					console.log(res.result)
					if (!res.result.code) {
						uni.showModal({
							title: "温馨提示",
							content: "你所输入的内容可能含有违法违规内容，不支持进行下一步操作"
						})
						return
					} else {
						// 你要进行的操作
					}
				})
			}
		}
	}
</script>

<style>
	swiper {
		height: 440upx;
	}

	.mtt10 {
		margin-top: -22upx;
	}
</style>
