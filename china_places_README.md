# 中国出生地数据

来源：AreaCity-JsSpider-StatsGov 2025.251231.260403版（2026-04-03发布）ok_geo.csv，https://github.com/xiangyuecn/AreaCity-JsSpider-StatsGov ，MIT许可证见china_places_LICENSE.txt。

共3635个省、市、区县地点，34个省级地区。大陆GCJ-02参考中心经迭代反算为WGS84近似坐标。港澳坐标保留来源参考值。台湾缺失项使用GeoNames TW数据（2026-10-06下载），https://download.geonames.org/export/dump/ ，CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ ，GeoNames attribution: https://www.geonames.org/ 。同名区县不能唯一匹配时保留null，不猜测；79个区县需手工坐标，所有城市层级均有参考坐标。

城市和行政区中心只作参考，可以在两页手动调整实际出生地点。数据为固定版本，不保证新设行政区实时同步；源版本未含和康县、和安县。历史UTC偏移仍由用户输入，不随地点选择覆盖。

构建：python tools/build_china_places.py；下载原始数据在tools/并已排除Git。JSON为两页共用的本地文件，网页不发送出生资料给外部地点服务。
