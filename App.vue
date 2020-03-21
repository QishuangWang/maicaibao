<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// wx.cloud.init({
		// 	env:'maicai-yx86w'
		// })	
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
@import './common/uni.css';
@import "./common/iconfont.css";
@import "./common/dt-ui-uni.css";
@import "./common/forum.css";
uni-input div{
	width: 100%;
}
.input-flex-btn{
	z-index: 2;
}
.header,.header-row{
		display: none;
}
uni-page-head .uni-page-head-hd{
	flex-direction: row;
}
.uni-tabbar,.uni-picker-view-wrapper{
	flex-direction: row !important;
}
.uni-swiper-dots{
	flex-direction: row;
}
.fixedAdd{
	position: fixed;
	bottom: 200upx;
	right: 7upx;
	width: 92upx;
	height: 92upx;
	text-align: center;
	box-sizing: border-box;
	background-color: rgba(240,85,75,.82);
	color: #fff;
	font-family: iconfont;
	font-size: 32upx;
	padding-top: 11upx;
	border-radius: 22upx;
	
}
.fixedAdd:before{
	content: "\e7e8";
	display: block;
	font-size: 32upx;
}

</style>
