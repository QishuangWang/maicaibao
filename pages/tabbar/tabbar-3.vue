<template>
	<view class="content">
		<form @submit="addGoods" @reset="Reset">
			<view class="uni-form-item uni-column">
				<view class="title">菜名</view>
				<input class="uni-input" name="input" placeholder="这是一个输入框" v-model="form.name" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">价格</view>
				<input class="uni-input" name="input" placeholder="这是一个输入框" v-model="form.price" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">图片地址</view>
				<input class="uni-input" name="input" placeholder="这是一个输入框" v-model="form.imgurl" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">编号</view>
				<input class="uni-input" name="input" placeholder="goods-1-1" v-model="form._id" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				form: {
					name: '茄子',
					price: '1.5',
					imgurl: 'http://img0.imgtn.bdimg.com/it/u=1983010112,3093733046&fm=26&gp=0.jpg',
					_id: 'goods-1-5',
				}
			}
		},
		onLoad() {

		},
		methods: {
			addGoods: function() {
				console.log(this.form)
				wx.cloud.init()
				const db = wx.cloud.database()
				db.collection('goods').add({
					// _id:'AOAqs5tCQ2ZYpk6d8WEtYfRBDfgB5qxL4eOw0ZWuLaov5AnA'
					// data 字段表示需新增的 JSON 数据
					data: this.form,
					success: function(res) {
						// res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
						console.log(res)
					}
				})
			},
			Reset: function() {

			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
