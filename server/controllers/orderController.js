import Model from '../models';

const { Order, Meal } = Model;

export default class OrderController {
  static placeOrder(req, res) {
    const {
      quantity, total, deliveryAddress, mealId
    } = req.body;
    const { userId } = req;

    Meal.findById(mealId).then(meal =>
      Order.create({
        quantity,
        total,
        deliveryAddress,
        status: 'PENDING',
        mealId,
        userId
      })
        .then(order => res.status(201).json({
          status: 'success',
          message: 'Order placed',
          Order: {
            meal: meal.name,
            quantity: order.quantity,
            total: order.total,
            deliveryAddress: order.deliveryAddress,
            status: order.status
          }
        }))).catch(err => res.status(500).json({
      message: 'Something went wrong'
    }));
  }

  static modifyOrder(req, res) {
    const {
      quantity, total, deliveryAddress
    } = req.body;

    Order.findById(req.params.id)
      .then((order) => {
        if (!order) {
          return res.status(400).json({
            status: 'error',
            message: 'Order not found'
          });
        }

        order.update({
          quantity,
          total,
          deliveryAddress,
          status: 'PENDING',
          mealId: order.mealId,
          userId: order.userId
        }).then(updatedOrder => res.status(200).json({
          status: 'success',
          message: 'order modified successfully',
          modifiedOrder: {
            quantity: updatedOrder.quantity,
            total: updatedOrder.total,
            deliveryAddress: updatedOrder.deliveryAddress,
            status: updatedOrder.status
          }
        }));
      });
  }
}
